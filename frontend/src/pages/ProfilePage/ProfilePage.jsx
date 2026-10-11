import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Button from "../../components/Button/Button.jsx";
import Input from "../../components/Input/Input.jsx";
import { validateProfile } from "../../utils/validation.js";
import "./ProfilePage.css";

/** Класс пункта меню: NavLink сам сообщает, активен ли он */
function menuLinkClass({ isActive }) {
  return isActive
    ? "profile-page__menu-link profile-page__menu-link--active"
    : "profile-page__menu-link";
}

/** Начальные значения формы из данных пользователя (?? "" — на случай пустых полей) */
function getInitialValues(user) {
  return {
    first_name: user?.first_name ?? "",
    last_name: user?.last_name ?? "",
    company_name: user?.company_name ?? "",
    location: user?.location ?? "",
    about: user?.about ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  };
}

function BriefcaseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const isEmployer = user?.role === "employer";

  // Функция в useState — значения из профиля берутся один раз, при открытии страницы
  const [values, setValues] = useState(() => getInitialValues(user));
  const [errors, setErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setIsSaved(false); // что-то поменяли — старое «сохранено» уже неактуально

    if (errors[name] || errors.form) {
      setErrors({ ...errors, [name]: "", form: "" });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    // 1. Клиентская проверка
    const validationErrors = validateProfile(values, user?.role);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // 2. «Серверная» проверка: не занят ли email другим пользователем
    const result = updateProfile(values);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setIsSaved(true);
  }

  function handleLogout() {
    navigate("/");
    logout();
  }

  return (
    <main className="profile-page">
      <div className="container profile-page__inner">
        <aside className="profile-page__sidebar">
          <p className="profile-page__sidebar-title">
            {isEmployer ? "Employer dashboard" : "Candidate dashboard"}
          </p>

          <nav aria-label="Account menu">
            <ul className="profile-page__menu">
              <li>
                {isEmployer ? (
                  <NavLink to="/dashboard" className={menuLinkClass}>
                    <DashboardIcon />
                    Dashboard
                  </NavLink>
                ) : (
                  <NavLink to="/my-applications" className={menuLinkClass}>
                    <BriefcaseIcon />
                    Applied Jobs
                  </NavLink>
                )}
              </li>
              <li>
                <NavLink to="/profile" className={menuLinkClass}>
                  <SettingsIcon />
                  Settings
                </NavLink>
              </li>
            </ul>
          </nav>

          <button type="button" className="profile-page__logout" onClick={handleLogout}>
            <LogoutIcon />
            Log-out
          </button>
        </aside>

        <section className="profile-page__content">
          <h1 className="profile-page__title">Settings</h1>

          <form className="profile-page__form" onSubmit={handleSubmit} noValidate>
            {errors.form && (
              <p className="profile-page__form-error" role="alert">
                {errors.form}
              </p>
            )}

            <div className="profile-page__section">
              <h2 className="profile-page__section-title">Basic Information</h2>
              <div className="profile-page__grid">
                <Input
                  label="First Name"
                  name="first_name"
                  placeholder="First name"
                  value={values.first_name}
                  onChange={handleChange}
                  error={errors.first_name}
                />
                <Input
                  label="Last Name"
                  name="last_name"
                  placeholder="Last name"
                  value={values.last_name}
                  onChange={handleChange}
                  error={errors.last_name}
                />

                {isEmployer && (
                  <Input
                    label="Company Name"
                    name="company_name"
                    placeholder="Company name"
                    value={values.company_name}
                    onChange={handleChange}
                    error={errors.company_name}
                  />
                )}

                <Input
                  label="Location"
                  name="location"
                  placeholder="City, country"
                  value={values.location}
                  onChange={handleChange}
                  error={errors.location}
                />

                <div className="profile-page__field-full">
                  <Input
                    label="About"
                    name="about"
                    type="textarea"
                    placeholder={
                      isEmployer
                        ? "Tell candidates about your company..."
                        : "Tell employers about yourself..."
                    }
                    value={values.about}
                    onChange={handleChange}
                    error={errors.about}
                  />
                </div>
              </div>
            </div>

            <div className="profile-page__section">
              <h2 className="profile-page__section-title">Contact Information</h2>
              <div className="profile-page__grid">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  placeholder="+7 700 000 00 00"
                  value={values.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
              </div>
            </div>

            <div className="profile-page__actions">
              <Button type="submit">Save Changes</Button>
              {isSaved && (
                <p className="profile-page__success" role="status">
                  Changes saved
                </p>
              )}
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default ProfilePage;
