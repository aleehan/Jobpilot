import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useJobs } from "../../context/JobsContext.jsx";
import Button from "../../components/Button/Button.jsx";
import DashboardSidebar from "../../components/DashboardSidebar/DashboardSidebar.jsx";
import JobForm from "../../components/JobForm/JobForm.jsx";
import { validateJob } from "../../utils/jobValidation.js";
import "./JobFormPage.css";

function formValues(job, company = "") {
  return {
    title: job?.title ?? "",
    company: job?.company ?? company,
    category: job?.category ?? "",
    employment_type: job?.employment_type ?? "",
    salary_min: job?.salary_min ?? "",
    salary_max: job?.salary_max ?? "",
    location: job?.location ?? "",
    description: job?.description ?? "",
    is_active: job?.is_active ?? true,
  };
}

function JobFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getJobById, addJob, updateJob } = useJobs();
  const isEditing = id !== undefined;
  const job = isEditing ? getJobById(id) : undefined;
  const canEdit = Boolean(job && job.employer_id === user?.id);
  const [values, setValues] = useState(() =>
    formValues(canEdit ? job : undefined, user?.company_name),
  );
  const [errors, setErrors] = useState({});

  // При переходе между созданием и редактированием форма получает новые значения.
  useEffect(() => {
    setValues(formValues(canEdit ? job : undefined, user?.company_name));
    setErrors({});
  }, [id, job, canEdit, user?.id, user?.company_name]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setValues((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      if (name === "salary_min" || name === "salary_max") {
        delete next.salary_min;
        delete next.salary_max;
      }
      return next;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (user?.role !== "employer" || (isEditing && !canEdit)) return;
    const nextErrors = validateJob(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      event.currentTarget.elements.namedItem(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    const data = {
      ...values,
      title: values.title.trim(),
      company: values.company.trim(),
      location: values.location.trim(),
      description: values.description.trim(),
      salary_min: Number(values.salary_min),
      salary_max: Number(values.salary_max),
    };
    if (isEditing) {
      updateJob(job.id, data);
    } else {
      addJob({ ...data, employer_id: user.id, requirements: [] });
    }
    navigate("/dashboard");
  }

  return (
    <main className="job-form-page">
      <div className="container job-form-page__layout">
        <DashboardSidebar />
        <section className="job-form-page__content" aria-labelledby="job-form-title">
          <h1 className="job-form-page__title" id="job-form-title">
            {isEditing ? "Edit Job" : "Post a Job"}
          </h1>
          {user?.role !== "employer" ? (
            <div className="job-form-page__empty">
              <p>Employer access required.</p>
              <Button to="/login">Sign in</Button>
            </div>
          ) : isEditing && !canEdit ? (
            <div className="job-form-page__empty">
              <p>This job was not found or is not available to your account.</p>
              <Button to="/dashboard" variant="outline">
                Back to dashboard
              </Button>
            </div>
          ) : (
            <>
              <p className="job-form-page__subtitle">
                {isEditing
                  ? "Update your vacancy details below."
                  : "Tell candidates about the role. All text and salary fields are required."}
              </p>
              <JobForm
                values={values}
                errors={errors}
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitLabel={isEditing ? "Save Changes" : "Post Job"}
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default JobFormPage;
