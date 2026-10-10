import { Link } from "react-router-dom";
import { EMPLOYMENT_TYPES } from "../../utils/constants.js";
import "./JobCard.css";

/**
 * @typedef {Object} JobCardProps
 * @property {Object | null} [job] вакансия (структура из раздела 7.2)
 * @property {boolean} [featured] выделить карточку жёлтым фоном
 */

/** @param {JobCardProps} props */
function JobCard({ job = null, featured = false }) {
  if (!job) {
    return null;
  }

  const typeItem = EMPLOYMENT_TYPES.find((item) => item.value === job.employment_type);
  const typeLabel = typeItem ? typeItem.label.replace(" ", "-") : job.employment_type;
  const salaryMin = job.salary_min.toLocaleString("en-US");
  const salaryMax = job.salary_max.toLocaleString("en-US");
  const className = featured ? "job-card job-card--featured" : "job-card";

  return (
    <article className={className}>
      <h3 className="job-card__title">
        <Link className="job-card__link" to={"/jobs/" + job.id}>
          {job.title}
        </Link>
      </h3>

      <div className="job-card__meta">
        <span className="job-card__type">{typeLabel}</span>
        <span className="job-card__salary">
          Salary: ${salaryMin} - ${salaryMax}
        </span>
      </div>

      <div className="job-card__footer">
        <div className="job-card__logo">{job.company.charAt(0).toUpperCase()}</div>

        <div className="job-card__info">
          <p className="job-card__company">{job.company}</p>
          <p className="job-card__location">
            <svg
              className="job-card__icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {job.location}
          </p>
        </div>

        <button className="job-card__bookmark" type="button" aria-label="Save job">
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
      </div>
    </article>
  );
}

export default JobCard;