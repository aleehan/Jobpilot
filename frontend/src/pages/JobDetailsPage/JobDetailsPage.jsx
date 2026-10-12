import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import JobCard from "../../components/JobCard/JobCard.jsx";
import { useApplications } from "../../context/ApplicationsContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useJobs } from "../../context/JobsContext.jsx";
import { CATEGORIES, EMPLOYMENT_TYPES } from "../../utils/constants.js";
import ApplyModal from "../../components/ApplyModal/ApplyModal.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import "./JobDetailsPage.css";

// Макет показывает эти пункты у каждой вакансии, в данных их нет, поэтому список статичный
const BENEFITS = [
  "401k Salary",
  "Async",
  "Learning budget",
  "Vision insurance",
  "4-day workweek",
  "Profit Sharing",
  "Free gym membership",
  "Equity Compensation",
  "No politics at work",
];

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function JobDetailsPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { hasApplied } = useApplications();
  const { jobs: allJobs, getJobById } = useJobs();
  const [isCopied, setIsCopied] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  // Вакансия из JobsContext (У3)
  const job = getJobById(id);

  if (!job || !job.is_active) {
    return <NotFoundPage />;
  }

  const typeItem = EMPLOYMENT_TYPES.find((item) => item.value === job.employment_type);
  const categoryItem = CATEGORIES.find((item) => item.value === job.category);
  const typeLabel = typeItem ? typeItem.label : job.employment_type;
  const categoryLabel = categoryItem ? categoryItem.label : job.category;
  const salaryMin = job.salary_min.toLocaleString("en-US");
  const salaryMax = job.salary_max.toLocaleString("en-US");

  // Похожие: сначала из той же категории, потом остальные. Показываем три.
  const others = allJobs.filter((item) => item.is_active && item.id !== job.id);
  const sameCategory = others.filter((item) => item.category === job.category);
  const differentCategory = others.filter((item) => item.category !== job.category);
  const relatedJobs = [...sameCategory, ...differentCategory].slice(0, 3);

  const handleApply = () => {
    setIsApplyOpen(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  };

  const renderApplyButton = () => {
    if (user && user.role === "employer") {
      return null;
    }
    if (!isAuthenticated) {
      return (
        <Button to="/login" size="lg">
          Apply Now →
        </Button>
      );
    }
    if (hasApplied(user.id, job.id)) {
      return (
        <Button size="lg" disabled>
          Already applied
        </Button>
      );
    }
    return (
      <Button size="lg" onClick={handleApply}>
        Apply Now →
      </Button>
    );
  };

  return (
    <main className="job-details">
      <section className="job-details__top">
        <div className="job-details__container job-details__top-inner">
          <h1 className="job-details__page-title">Job Details</h1>
          <nav className="job-details__breadcrumbs" aria-label="Breadcrumb">
            <Link className="job-details__crumb" to="/">
              Home
            </Link>
            <span className="job-details__separator">/</span>
            <Link className="job-details__crumb" to="/jobs">
              Find Job
            </Link>
            <span className="job-details__separator">/</span>
            <span className="job-details__crumb job-details__crumb--current">Job Details</span>
          </nav>
        </div>
      </section>

      <section className="job-details__content">
        <div className="job-details__container">
          <div className="job-details__head">
            <div className="job-details__company">
              <div className="job-details__logo">{job.company.charAt(0).toUpperCase()}</div>
              <div>
                <h2 className="job-details__title">{job.title}</h2>
                <p className="job-details__at">
                  at {job.company}
                  <span className="job-details__badge job-details__badge--type">
                    {typeLabel.replace(" ", "-")}
                  </span>
                </p>
              </div>
            </div>

            <div className="job-details__actions">
              <button className="job-details__bookmark" type="button" aria-label="Save job">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 3h12v18l-6-4-6 4z" />
                </svg>
              </button>
              {renderApplyButton()}
            </div>
          </div>

          <div className="job-details__layout">
            <div className="job-details__main">
              <h3 className="job-details__heading">Job Description</h3>
              <p className="job-details__text">{job.description}</p>

              <h3 className="job-details__heading">Requirements</h3>
              <ul className="job-details__list">
                {job.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <aside className="job-details__aside">
              <div className="job-details__card job-details__card--split">
                <div className="job-details__stat">
                  <p className="job-details__stat-label">Salary (USD)</p>
                  <p className="job-details__stat-value job-details__stat-value--primary">
                    ${salaryMin} - ${salaryMax}
                  </p>
                  <p className="job-details__stat-note">Monthly salary</p>
                </div>
                <div className="job-details__stat">
                  <p className="job-details__stat-label">Job Location</p>
                  <p className="job-details__stat-value">{job.location}</p>
                </div>
              </div>

              <div className="job-details__card">
                <h3 className="job-details__card-title">Job Benefits</h3>
                <ul className="job-details__benefits">
                  {BENEFITS.map((item) => (
                    <li key={item} className="job-details__benefit">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="job-details__card">
                <h3 className="job-details__card-title">Job Overview</h3>
                <dl className="job-details__overview">
                  <div>
                    <dt>Job Posted</dt>
                    <dd>{formatDate(job.created_at)}</dd>
                  </div>
                  <div>
                    <dt>Job Type</dt>
                    <dd>{typeLabel}</dd>
                  </div>
                  <div>
                    <dt>Category</dt>
                    <dd>{categoryLabel}</dd>
                  </div>
                </dl>

                <p className="job-details__share-label">Share this job:</p>
                <button className="job-details__copy" type="button" onClick={handleCopyLink}>
                  {isCopied ? "Link copied!" : "Copy Links"}
                </button>
              </div>
            </aside>
          </div>

          <section className="job-details__related">
            <h3 className="job-details__related-title">Related Jobs</h3>
            <div className="job-details__related-grid">
              {relatedJobs.map((item) => (
                <JobCard key={item.id} job={item} />
              ))}
            </div>
          </section>
        </div>
      </section>
      {isApplyOpen && <ApplyModal job={job} onClose={() => setIsApplyOpen(false)} />}
    </main>
  );
}

export default JobDetailsPage;