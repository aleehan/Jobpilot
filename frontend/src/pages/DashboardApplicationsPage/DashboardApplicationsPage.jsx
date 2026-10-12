import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useJobs } from "../../context/JobsContext.jsx";
import { useApplications } from "../../context/ApplicationsContext.jsx";
import DashboardSidebar from "../../components/DashboardSidebar/DashboardSidebar.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import StatusBadge from "../../components/StatusBadge/StatusBadge.jsx";
import { APPLICATION_STATUSES } from "../../utils/constants.js";
import "./DashboardApplicationsPage.css";

function DashboardApplicationsPage() {
  const { user } = useAuth();
  const { jobs } = useJobs();
  const { applications, updateStatus } = useApplications();
  const [jobFilter, setJobFilter] = useState("");
  const [notice, setNotice] = useState("");
  const myJobs = jobs.filter((job) => job.employer_id === user?.id);
  const myJobMap = new Map(myJobs.map((job) => [job.id, job]));
  // Если вакансия удалена, устаревший фильтр не прячет остальные отклики.
  const activeFilter = myJobMap.has(Number(jobFilter)) ? jobFilter : "";
  const myApplications = applications.filter((item) => myJobMap.has(Number(item.job_id)));
  const visibleApplications = myApplications.filter(
    (item) => !activeFilter || Number(item.job_id) === Number(activeFilter),
  );

  function changeStatus(application, status) {
    if (user?.role !== "employer" || !myJobMap.has(Number(application.job_id))) return;
    if (!APPLICATION_STATUSES.some((item) => item.value === status)) return;
    updateStatus(application.id, status);
    const label = APPLICATION_STATUSES.find((item) => item.value === status).label;
    setNotice(`${application.full_name}: status changed to ${label}.`);
  }

  return (
    <main className="dashboard-applications-page">
      <div className="container dashboard-applications-page__layout">
        <DashboardSidebar />
        <section
          className="dashboard-applications-page__content"
          aria-labelledby="applications-title"
        >
          <h1 className="dashboard-applications-page__title" id="applications-title">
            Applications
          </h1>
          {user?.role !== "employer" ? (
            <div className="dashboard-applications-page__empty">
              <p>Employer access required.</p>
              <Button to="/login">Sign in</Button>
            </div>
          ) : (
            <>
              <p className="dashboard-applications-page__subtitle">
                Review candidates and keep them informed about their application.
              </p>
              <div className="dashboard-applications-page__toolbar">
                <Input
                  label="Filter by job"
                  name="job_filter"
                  type="select"
                  value={activeFilter}
                  onChange={(event) => setJobFilter(event.target.value)}
                  options={[
                    { value: "", label: "All my jobs" },
                    ...myJobs.map((job) => ({ value: String(job.id), label: job.title })),
                  ]}
                />
                <p className="dashboard-applications-page__result-count">
                  {visibleApplications.length} application
                  {visibleApplications.length === 1 ? "" : "s"}
                </p>
              </div>
              <p className="dashboard-applications-page__notice" role="status">
                {notice}
              </p>
              {visibleApplications.length === 0 ? (
                <div className="dashboard-applications-page__empty">
                  <p>
                    {activeFilter
                      ? "No applications for this job yet."
                      : "No applications yet. Candidates will appear here after they apply."}
                  </p>
                  <Button to="/dashboard" variant="outline">
                    Back to dashboard
                  </Button>
                </div>
              ) : (
                <ul className="dashboard-applications-page__list">
                  {visibleApplications.map((application) => (
                    <li className="dashboard-applications-page__item" key={application.id}>
                      <article
                        className="dashboard-applications-page__card"
                        aria-labelledby={`candidate-${application.id}`}
                      >
                        <header className="dashboard-applications-page__card-header">
                          <div className="dashboard-applications-page__identity">
                            <h2
                              className="dashboard-applications-page__name"
                              id={`candidate-${application.id}`}
                            >
                              {application.full_name}
                            </h2>
                            <p className="dashboard-applications-page__job">
                              {myJobMap.get(Number(application.job_id)).title}
                            </p>
                          </div>
                          <StatusBadge status={application.status} />
                        </header>
                        <dl className="dashboard-applications-page__details">
                          {[
                            ["Email", application.email],
                            ["Phone", application.phone || "Not provided"],
                            ["Applied", application.created_at],
                            ["Resume file", application.resume_name || "Not provided"],
                          ].map(([label, value]) => (
                            <div className="dashboard-applications-page__detail" key={label}>
                              <dt className="dashboard-applications-page__detail-label">{label}</dt>
                              <dd className="dashboard-applications-page__detail-value">{value}</dd>
                            </div>
                          ))}
                        </dl>
                        <h3 className="dashboard-applications-page__letter-title">Cover letter</h3>
                        <p className="dashboard-applications-page__letter">
                          {application.cover_letter || "No cover letter provided."}
                        </p>
                        <div className="dashboard-applications-page__status-control">
                          <Input
                            label={`Status for ${application.full_name}`}
                            name={`status_${application.id}`}
                            type="select"
                            value={application.status}
                            onChange={(event) => changeStatus(application, event.target.value)}
                            options={APPLICATION_STATUSES}
                          />
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default DashboardApplicationsPage;
