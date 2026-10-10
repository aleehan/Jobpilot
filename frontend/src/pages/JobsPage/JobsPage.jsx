import { Link } from "react-router-dom";
import JobCard from "../../components/JobCard/JobCard.jsx";
import { jobsTemp } from "../../mocks/jobsTemp.js";
import "./JobsPage.css";

function JobsPage() {
  // Временно: вакансии из jobsTemp.
  // Когда появится JobsContext (У3), заменить на useJobs().
  const jobs = jobsTemp.filter((job) => job.is_active);

  return (
    <main className="jobs-page">
      <section className="jobs-page__header">
        <div className="jobs-page__container jobs-page__header-inner">
          <h1 className="jobs-page__title">Find Job</h1>
          <nav className="jobs-page__breadcrumbs" aria-label="Breadcrumb">
            <Link className="jobs-page__crumb" to="/">
              Home
            </Link>
            <span className="jobs-page__separator">/</span>
            <span className="jobs-page__crumb jobs-page__crumb--current">Find job</span>
          </nav>
        </div>
      </section>

      <section className="jobs-page__content">
        <div className="jobs-page__container">
          {jobs.length === 0 ? (
            <p className="jobs-page__empty">No jobs found</p>
          ) : (
            <div className="jobs-page__grid">
              {jobs.map((job, index) => (
                <JobCard key={job.id} job={job} featured={index < 2} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default JobsPage;