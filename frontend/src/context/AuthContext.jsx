import { createContext, useContext, useEffect, useState } from "react";
import initialUsers from "../mocks/users.js";

const AuthContext = createContext(null);

const USERS_KEY = "jobpilot_users";
const CURRENT_USER_KEY = "jobpilot_current_user_id";

function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function withoutPassword(user) {
  if (!user) return null;
  const copy = { ...user };
  delete copy.password;
  return copy;
}

export function AuthProvider({ children = null }) {
  const [users, setUsers] = useState(() => loadFromStorage(USERS_KEY, initialUsers));
  const [currentUserId, setCurrentUserId] = useState(() => loadFromStorage(CURRENT_USER_KEY, null));

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUserId));
  }, [currentUserId]);

  const user = withoutPassword(users.find((u) => u.id === currentUserId));

  function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    const found = users.find((u) => u.email === normalizedEmail && u.password === password);

    if (!found) {
      return { ok: false, errors: { form: "Invalid email or password" } };
    }
    setCurrentUserId(found.id);
    return { ok: true };
  }

  function register({ first_name, last_name, email, password, role }) {
    const normalizedEmail = email.trim().toLowerCase();

    // Сценарий 4: имитация серверной проверки
    if (users.some((u) => u.email === normalizedEmail)) {
      return { ok: false, errors: { email: "Email is already registered" } };
    }

    const newUser = {
      id: Math.max(0, ...users.map((u) => u.id)) + 1,
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email: normalizedEmail,
      password,
      role: role === "employer" ? "employer" : "candidate",
      phone: "",
      location: "",
      about: "",
      company_name: "",
    };

    setUsers([...users, newUser]);
    setCurrentUserId(newUser.id); // после регистрации сразу вошёл
    return { ok: true };
  }

  function logout() {
    setCurrentUserId(null);
  }

  function updateProfile(data) {
    if (!user) {
      return { ok: false, errors: { form: "You are not logged in" } };
    }

    const normalizedEmail = (data.email ?? user.email).trim().toLowerCase();
    if (users.some((u) => u.email === normalizedEmail && u.id !== user.id)) {
      return { ok: false, errors: { email: "Email is already registered" } };
    }

    setUsers(
      users.map((u) =>
        u.id === user.id
          ? { ...u, ...data, email: normalizedEmail, id: u.id, role: u.role, password: u.password }
          : u,
      ),
    );
    return { ok: true };
  }

  const value = {
    user,
    isAuthenticated: user !== null,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
