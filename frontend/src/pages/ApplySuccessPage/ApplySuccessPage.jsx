import { useLocation } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import "./ApplySuccessPage.css";

function ApplySuccessPage() {
  const location = useLocation();
  // Название вакансии приходит из ApplyModal через navigate(..., { state })
  const jobTitle = location.state ? location.state.jobTitle : "";

  const message = jobTitle
    ? "Your application for " + jobTitle + " has been submitted."
    : "Your application has been submitted.";

  return (
    <main className="apply-success">
      <div className="apply-success__card">
        <div className="apply-success__icon">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>

        <h1 className="apply-success__title">Application sent!</h1>
        <p className="apply-success__text">
          {message} The employer will review it, and you can follow its status on the My
          Applications page.
        </p>

        <div className="apply-success__actions">
          <Button to="/my-applications">My Applications</Button>
          <Button to="/jobs" variant="outline">
            Browse jobs
          </Button>
        </div>
      </div>
    </main>
  );
}

export default ApplySuccessPage;