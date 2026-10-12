import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useJobs } from "../../context/JobsContext.jsx";
import { useApplications } from "../../context/ApplicationsContext.jsx";
import Button from "../../components/Button/Button.jsx";
import StatCard from "../../components/StatCard/StatCard.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import DashboardSidebar from "../../components/DashboardSidebar/DashboardSidebar.jsx";
import { EMPLOYMENT_TYPES } from "../../utils/constants.js";
import "./DashboardPage.css";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

function DashboardPage() {
  const { user } = useAuth();
  const { jobs, deleteJob } = useJobs();
  const { applications } = useApplications();
  const [deleteId, setDeleteId] = useState(null);
  const [notice, setNotice] = useState("");
  const myJobs = jobs.filter((job) => job.employer_id === user?.id);
  const myJobIds = new Set(myJobs.map((job) => job.id));
  const myApplications = applications.filter((item) => myJobIds.has(Number(item.job_id)));
  const selectedJob = myJobs.find((job) => job.id === deleteId);
  const stats = [
    { value: myJobs.length, label: "Total jobs", icon: "briefcase", isHighlighted: true },
    {
      value: myJobs.filter((job) => job.is_active).length,
      label: "Active jobs",
      icon: "buildings",
    },
    { value: myApplications.length, label: "Total applications", icon: "users" },
    {
      value: myApplications.filter((item) => item.status === "pending").length,
      label: "Pending applications",
      icon: "users",
    },
  ];

  function confirmDelete() {
    if (user?.role !== "employer" || !selectedJob) return;
    deleteJob(selectedJob.id);
    setNotice(`“${selectedJob.title}” was deleted.`);
    setDeleteId(null);
  }

  if (user?.role !== "employer") {
    return (
      <main className="dashboard-page">
        <div className="container">
          <p>Employer access required.</p>
          <Link to="/login">Sign in</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <div className="container dashboard-page__layout">
        <DashboardSidebar />
        <section className="dashboard-page__content" aria-labelledby="dashboard-title">
          <header className="dashboard-page__heading">
            <div>
              <h1 className="dashboard-page__title" id="dashboard-title">
                Hello, {user.first_name || "Employer"}
              </h1>
              <p className="dashboard-page__subtitle">
                Here is what is happening with your jobs and applications.
              </p>
            </div>
            <Button to="/dashboard/jobs/new">Post a Job</Button>
          </header>
          <div className="dashboard-page__stats">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
          <p className="dashboard-page__notice" role="status">
            {notice}
          </p>
          <section className="dashboard-page__panel" aria-labelledby="my-jobs-title">
            <div className="dashboard-page__panel-heading">
              <h2 className="dashboard-page__section-title" id="my-jobs-title">
                My jobs <span className="dashboard-page__count">({myJobs.length})</span>
              </h2>
              <Link className="dashboard-page__link" to="/dashboard/applications">
                View applications
              </Link>
            </div>
            {myJobs.length === 0 ? (
              <div className="dashboard-page__empty">
                <p>You have not posted any jobs yet.</p>
                <Button to="/dashboard/jobs/new">Post your first job</Button>
              </div>
            ) : (
              <div
                className="dashboard-page__table-scroll"
                role="region"
                aria-label="Your vacancies"
                tabIndex={0}
              >
                <table className="dashboard-page__table">
                  <caption className="visually-hidden">
                    Your vacancies, their status and available actions
                  </caption>
                  <thead>
                    <tr>
                      {["Job", "Status", "Applications", "Actions"].map((label) => (
                        <th className="dashboard-page__th" scope="col" key={label}>
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {myJobs.map((job) => (
                      <tr className="dashboard-page__row" key={job.id}>
                        <td className="dashboard-page__td">
                          <Link
                            className="dashboard-page__job-title"
                            to={`/dashboard/jobs/${job.id}/edit`}
                          >
                            {job.title}
                          </Link>
                          <p className="dashboard-page__meta">
                            {job.company} · {job.location}
                          </p>
                          <p className="dashboard-page__meta">
                            {EMPLOYMENT_TYPES.find((type) => type.value === job.employment_type)
                              ?.label ?? job.employment_type}{" "}
                            · {money.format(job.salary_min)} – {money.format(job.salary_max)} /
                            month
                          </p>
                        </td>
                        <td className="dashboard-page__td">
                          <span
                            className={`dashboard-page__status${job.is_active ? " dashboard-page__status--active" : ""}`}
                          >
                            {job.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="dashboard-page__td">
                          {myApplications.filter((item) => Number(item.job_id) === job.id).length}
                        </td>
                        <td className="dashboard-page__td">
                          <div className="dashboard-page__actions">
                            <Button to={`/dashboard/jobs/${job.id}/edit`} variant="outline">
                              Edit
                            </Button>
                            <Button variant="danger" onClick={() => setDeleteId(job.id)}>
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
          <Modal
            isOpen={Boolean(selectedJob)}
            title="Delete vacancy?"
            onClose={() => setDeleteId(null)}
          >
            <p className="dashboard-page__modal-copy">
              Delete “{selectedJob?.title}”? This vacancy will no longer be available. This action
              cannot be undone.
            </p>
            <div className="dashboard-page__actions">
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete vacancy
              </Button>
            </div>
          </Modal>
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
