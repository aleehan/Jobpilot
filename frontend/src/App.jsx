import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

import HomePage from "./pages/HomePage/HomePage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";

import facebookIcon from "./assets/footer/facebook.svg";
import youtubeIcon from "./assets/footer/youtube.svg";
import instagramIcon from "./assets/footer/instagram.svg";
import twitterIcon from "./assets/footer/twitter.svg";

const navLinks = [
  { label: "Home", href: "/", isActive: true },
  { label: "Find Job", href: "/jobs" },
  { label: "Employers", href: "/employers" },
  { label: "Candidates", href: "/candidates" },
  { label: "Pricing Plans", href: "/pricing" },
  { label: "Customer Supports", href: "/support" },
];

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

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Header
        logoText="Jobpilot"
        logoHref="/"
        navLinks={navLinks}
        phone="+1-202-555-0178"
        language={{ label: "English", flagSrc: "/flags/us.svg" }}
        country={{ label: "India", flagSrc: "/flags/in.svg" }}
        searchPlaceholder="Job title, keyword, company"
        searchValue=""
        signInLabel="Sign In"
        postJobLabel="Post A Jobs"
        menuOpenLabel="Open menu"
        menuCloseLabel="Close menu"
        isMenuOpen={false}
        onSearchChange={() => {}}
      />
      <Routes>
        {/* Все */}
        <Route path="/" element={<HomePage />} />
        {/*<Route path="/jobs" element={<JobsPage />} />*/}
        {/*<Route path="/jobs/:id" element={<JobDetailsPage />} />*/}

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
        {/*<Route path="/apply/success" element={<ProtectedRoute role="candidate"><ApplySuccessPage /></ProtectedRoute>} />*/}
        {/*<Route path="/my-applications" element={<ProtectedRoute role="candidate"><MyApplicationsPage /></ProtectedRoute>} />*/}

        {/* Работодатель */}
        {/*<Route path="/dashboard" element={<ProtectedRoute role="employer"><DashboardPage /></ProtectedRoute>} />*/}
        {/*<Route path="/dashboard/jobs/new" element={<ProtectedRoute role="employer"><JobFormPage /></ProtectedRoute>} />*/}
        {/*<Route path="/dashboard/jobs/:id/edit" element={<ProtectedRoute role="employer"><JobFormPage /></ProtectedRoute>} />*/}
        {/*<Route path="/dashboard/applications" element={<ProtectedRoute role="employer"><DashboardApplicationsPage /></ProtectedRoute>} />*/}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
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
    </>
  );
}

export default App;
