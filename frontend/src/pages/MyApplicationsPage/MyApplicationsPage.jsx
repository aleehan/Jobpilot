import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import StatusBadge from "../../components/StatusBadge/StatusBadge.jsx";
import { useApplications } from "../../context/ApplicationsContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useJobs } from "../../context/JobsContext.jsx";
import { EMPLOYMENT_TYPES } from "../../utils/constants.js";
import "./MyApplicationsPage.css";

const ICONS = {
  overview: "M12 3l9 5-9 5-9-5 9-5z M3 13l9 5 9-5",
  applied: "M4 8h16v11H4z M9 8V5h6v3 M4 13h16",
  favorite: "M6 3h12v18l-6-4-6 4z",
  alert: "M6 17h12l-1.5-2V10a4.5 4.5 0 0 0-9 0v5L6 17z M10 20h4",
  settings: "M4 7h16 M4 17h16 M9 5v4 M15 15v4",
  logout: "M15 4h4v16h-4 M10 8l-4 4 4 4 M6 12h10",
  pin: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z M12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",
  dollar:
    "M12 3v18 M16 7.5c0-1.4-1.8-2.5-4-2.5s-4 1.1-4 2.5 1.8 2.5 4 2.5 4 1.1 4 2.5-1.8 2.5-4 2.5-4-1.1-4-2.5",
};

// Пункты меню, кроме «Applied Jobs», в проекте пока не реализованы: показываем как в макете
const NAV_ITEMS = [
  // { key: "overview", label: "Overview", icon: "overview" },
  { key: "applied", label: "Applied Jobs", icon: "applied", isActive: true },
  // { key: "favorite", label: "Favorite Jobs", icon: "favorite" },
  // { key: "alert", label: "Job Alert", icon: "alert" },
  // { key: "settings", label: "Settings", icon: "settings" },
];

function Icon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function MyApplicationsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getApplicationsByUser } = useApplications();
  const { getJobById } = useJobs();

  // Новые отклики сверху
  const myApplications = user ? [...getApplicationsByUser(user.id)] : [];
  myApplications.sort((a, b) => b.created_at.localeCompare(a.created_at) || b.id - a.id);

  // Вакансия для каждого отклика берётся из JobsContext (У3)
  const rows = myApplications.map((application) => ({
    application,
    job: getJobById(application.job_id),
  }));

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <main className="my-applications">
      <div className="my-applications__container">
        <aside className="my-applications__sidebar">
          <p className="my-applications__sidebar-title">Candidate Dashboard</p>
          <ul className="my-applications__nav">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.key}
                className={
                  item.isActive
                    ? "my-applications__nav-item my-applications__nav-item--active"
                    : "my-applications__nav-item"
                }
              >
                <Icon name={item.icon} />
                {item.label}
              </li>
            ))}
          </ul>
          <button className="my-applications__logout" type="button" onClick={handleLogout}>
            <Icon name="logout" />
            Log-out
          </button>
        </aside>

        <section className="my-applications__content">
          <h1 className="my-applications__title">
            Applied Jobs <span className="my-applications__count">({rows.length})</span>
          </h1>

          {rows.length === 0 ? (
            <div className="my-applications__empty">
              <p className="my-applications__empty-text">
                You haven&apos;t applied to any jobs yet.
              </p>
              <Button to="/jobs">Browse jobs</Button>
            </div>
          ) : (
            <div className="my-applications__table">
              <div className="my-applications__head">
                <span>Jobs</span>
                <span>Date Applied</span>
                <span>Status</span>
                <span>Action</span>
              </div>

              <ul className="my-applications__list">
                {rows.map(({ application, job }) => {
                  const typeItem = job
                    ? EMPLOYMENT_TYPES.find((item) => item.value === job.employment_type)
                    : null;

                  return (
                    <li key={application.id} className="my-applications__row">
                      <div className="my-applications__job">
                        <div className="my-applications__logo">
                          {job ? job.company.charAt(0).toUpperCase() : "?"}
                        </div>
                        {job ? (
                          <div className="my-applications__job-info">
                            <p className="my-applications__job-title">
                              {job.title}
                              <span className="my-applications__type">
                                {typeItem ? typeItem.label : job.employment_type}
                              </span>
                            </p>
                            <p className="my-applications__job-meta">
                              <span className="my-applications__meta-item">
                                <Icon name="pin" size={16} />
                                {job.location}
                              </span>
                              <span className="my-applications__meta-item">
                                <Icon name="dollar" size={16} />$
                                {job.salary_min.toLocaleString("en-US")} - $
                                {job.salary_max.toLocaleString("en-US")}/month
                              </span>
                            </p>
                          </div>
                        ) : (
                          <p className="my-applications__job-title">
                            This job is no longer available
                          </p>
                        )}
                      </div>

                      <p className="my-applications__cell">
                        <span className="my-applications__label">Date applied: </span>
                        {formatDate(application.created_at)}
                      </p>

                      <div className="my-applications__cell">
                        <StatusBadge status={application.status} />
                      </div>

                      <div className="my-applications__cell">
                        {job && (
                          <Button to={"/jobs/" + job.id} variant="outline">
                            View Details
                          </Button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default MyApplicationsPage;
