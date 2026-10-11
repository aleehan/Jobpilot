import { NavLink } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import Input from "../../components/Input/Input.jsx";
import "./ProfilePage.css";

/** Класс пункта меню: NavLink сам сообщает, активен ли он */
function menuLinkClass({ isActive }) {
  return isActive
    ? "profile-page__menu-link profile-page__menu-link--active"
    : "profile-page__menu-link";
}

function ProfilePage() {
  return (
    <main className="profile-page">
      <div className="container profile-page__inner">
        <aside className="profile-page__sidebar">
          <p className="profile-page__sidebar-title">Candidate dashboard</p>

          <nav aria-label="Candidate menu">
            <ul className="profile-page__menu">
              <li>
                <NavLink to="/my-applications" className={menuLinkClass}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect
                      x="3"
                      y="7"
                      width="18"
                      height="13"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  Applied Jobs
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className={menuLinkClass}>
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
                  Settings
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Логика выхода добавится позже */}
          <button type="button" className="profile-page__logout">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Log-out
          </button>
        </aside>

        <section className="profile-page__content">
          <h1 className="profile-page__title">Settings</h1>

          {/* preventDefault временно: чтобы кнопка не перезагружала страницу, пока нет логики */}
          <form
            className="profile-page__form"
            onSubmit={(event) => event.preventDefault()}
            noValidate
          >
            <div className="profile-page__section">
              <h2 className="profile-page__section-title">Basic Information</h2>
              <div className="profile-page__grid">
                <Input label="First Name" name="first_name" placeholder="First name" />
                <Input label="Last Name" name="last_name" placeholder="Last name" />
                <Input label="Location" name="location" placeholder="City, country" />
                {/* У работодателя здесь появится поле Company Name */}
                <div className="profile-page__field-full">
                  <Input
                    label="About"
                    name="about"
                    type="textarea"
                    placeholder="Tell employers about yourself..."
                  />
                </div>
              </div>
            </div>

            <div className="profile-page__section">
              <h2 className="profile-page__section-title">Contact Information</h2>
              <div className="profile-page__grid">
                <Input label="Email" name="email" type="email" placeholder="Email address" />
                <Input label="Phone" name="phone" type="tel" placeholder="+7 700 000 00 00" />
              </div>
            </div>

            <div className="profile-page__actions">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default ProfilePage;
