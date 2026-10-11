import { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

import HomePage from "./pages/HomePage/HomePage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import JobsPage from "./pages/JobsPage/JobsPage.jsx";
import JobDetailsPage from "./pages/JobDetailsPage/JobDetailsPage.jsx";
import ApplySuccessPage from "./pages/ApplySuccessPage/ApplySuccessPage.jsx";
import MyApplicationsPage from "./pages/MyApplicationsPage/MyApplicationsPage.jsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.jsx";
import JobFormPage from "./pages/JobFormPage/JobFormPage.jsx";
import DashboardApplicationsPage from "./pages/DashboardApplicationsPage/DashboardApplicationsPage.jsx";

import facebookIcon from "./assets/footer/facebook.svg";
import youtubeIcon from "./assets/footer/youtube.svg";
import instagramIcon from "./assets/footer/instagram.svg";
import twitterIcon from "./assets/footer/twitter.svg";

const footerColumns = [
  {
    title: "Quick Link",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact", isActive: true },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Candidate",
    links: [
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Browse Employers", href: "/employers" },
      { label: "Candidate Dashboard", href: "/profile" },
      { label: "Saved Jobs", href: "/saved-jobs" },
    ],
  },
  {
    title: "Employers",
    links: [
      { label: "Post a Job", href: "/dashboard/jobs/new" },
      { label: "Browse Candidates", href: "/candidates" },
      { label: "Employers Dashboard", href: "/dashboard" },
      { label: "Applications", href: "/dashboard/applications" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Faqs", href: "/faqs" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com", iconSrc: facebookIcon },
  { label: "YouTube", href: "https://youtube.com", iconSrc: youtubeIcon },
  { label: "Instagram", href: "https://instagram.com", iconSrc: instagramIcon },
  { label: "Twitter", href: "https://twitter.com", iconSrc: twitterIcon },
];

const AUTH_PATHS = ["/login", "/register"];

/** Пункты меню зависят от того, кто вошёл, и подсвечивается текущий раздел */
function getNavLinks(user, pathname) {
  const links = [
    { label: "Home", href: "/" },
    { label: "Find Job", href: "/jobs" },
  ];

  if (user?.role === "candidate") {
    links.push({ label: "My Applications", href: "/my-applications" });
  }
  if (user?.role === "employer") {
    links.push({ label: "Dashboard", href: "/dashboard" });
  }

  return links.map((link) => ({
    ...link,
    // Главная активна только на "/", остальные — и на вложенных адресах (/jobs/5 → Find Job)
    isActive: link.href === "/" ? pathname === "/" : pathname.startsWith(link.href),
  }));
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Запоминаем, на каком адресе открыли меню.
  // Сменился адрес — значения не совпадают, и меню закрывается само.
  const [menuOpenedAt, setMenuOpenedAt] = useState(null);
  const isMenuOpen = menuOpenedAt === location.pathname;

  const [searchQuery, setSearchQuery] = useState("");

  const isAuthPage = AUTH_PATHS.includes(location.pathname);

  function handleMenuToggle() {
    setMenuOpenedAt(isMenuOpen ? null : location.pathname);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const query = searchQuery.trim();
    setMenuOpenedAt(null);
    navigate(query ? "/jobs?" + new URLSearchParams({ q: query }) : "/jobs");
  }

  function handleLogout() {
    setMenuOpenedAt(null);
    navigate("/");
    logout();
  }

  return (
    <>
      {!isAuthPage && (
        <Header
          logoText="Jobpilot"
          logoHref="/"
          navLinks={getNavLinks(user, location.pathname)}
          phone="+1-202-555-0178"
          language={{ label: "English", flagSrc: "/flags/us.svg" }}
          country={{ label: "India", flagSrc: "/flags/in.svg" }}
          searchPlaceholder="Job title, keyword, company"
          searchValue={searchQuery}
          signInLabel="Sign In"
          postJobLabel="Post A Job"
          menuOpenLabel="Open menu"
          menuCloseLabel="Close menu"
          isMenuOpen={isMenuOpen}
          userName={user ? user.first_name + " " + user.last_name : ""}
          profileHref="/profile"
          logoutLabel="Log Out"
          onSearchChange={(event) => setSearchQuery(event.target.value)}
          onSearchSubmit={handleSearchSubmit}
          onSignInClick={() => navigate("/login")}
          onPostJobClick={() => navigate("/register")}
          onLogoutClick={handleLogout}
          onMenuToggle={handleMenuToggle}
        />
      )}

      <Routes>
        {/* Все */}
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />

        {/* Гость (страницы сами редиректят вошедшего на /) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Любой вошедший */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Соискатель */}
        <Route
          path="/apply/success"
          element={
            <ProtectedRoute role="candidate">
              <ApplySuccessPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute role="candidate">
              <MyApplicationsPage />
            </ProtectedRoute>
          }
        />

        {/* Работодатель */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="employer">
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/jobs/new"
          element={
            <ProtectedRoute role="employer">
              <JobFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/jobs/:id/edit"
          element={
            <ProtectedRoute role="employer">
              <JobFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/applications"
          element={
            <ProtectedRoute role="employer">
              <DashboardApplicationsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!isAuthPage && (
        <Footer
          logoText="Jobpilot"
          logoHref="/"
          phoneLabel="Call now:"
          phone="(319) 555-0115"
          address="6391 Elgin St. Celina, Delaware 10299, New York, United States of America"
          columns={footerColumns}
          copyright="© 2021 Jobpilot - Job Portal. All rights Reserved"
          socials={socials}
        />
      )}
    </>
  );
}

export default App;
