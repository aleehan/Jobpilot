import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApplications } from "../../context/ApplicationsContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { validateApplication } from "../../utils/applicationValidation.js";
import { RESUME_ALLOWED_EXTENSIONS, RESUME_MAX_SIZE_MB } from "../../utils/constants.js";
import Button from "../Button/Button.jsx";
import Input from "../Input/Input.jsx";
import Modal from "../Modal/Modal.jsx";
import "./ApplyModal.css";

/**
 * @typedef {Object} ApplyModalProps
 * @property {Object | null} [job] вакансия, на которую откликаются
 * @property {() => void} [onClose] закрытие окна (Cancel, крестик, Esc, клик на фон)
 */

/**
 * Окно отклика. Рисуется только пока открыто:
 * {isOpen && <ApplyModal job={job} onClose={...} />}
 * Так форма каждый раз начинается с чистого состояния.
 * @param {ApplyModalProps} props
 */
function ApplyModal({ job = null, onClose = () => {} }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addApplication } = useApplications();

  // Имя, email и телефон подставляются из профиля
  const [values, setValues] = useState({
    full_name: [user?.first_name, user?.last_name].filter(Boolean).join(" "),
    email: user?.email || "",
    phone: user?.phone || "",
    cover_letter: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [errors, setErrors] = useState({});

  if (!job || !user) {
    return null;
  }

  const clearError = (name) => {
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const handleFileChange = (event) => {
    setResumeFile(event.target.files[0] || null);
    clearError("resume");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateApplication(values, resumeFile);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    addApplication({
      job_id: job.id,
      user_id: user.id,
      full_name: values.full_name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      cover_letter: values.cover_letter.trim(),
      resume_name: resumeFile.name,
    });
    onClose();
    navigate("/apply/success", { state: { jobTitle: job.title } });
  };

  const fileInputClass = errors.resume
    ? "apply-modal__file-input apply-modal__file-input--error"
    : "apply-modal__file-input";

  return (
    <Modal isOpen title={"Apply Job: " + job.title} onClose={onClose}>
      <form className="apply-modal" onSubmit={handleSubmit} noValidate>
        <Input
          label="Full name"
          name="full_name"
          value={values.full_name}
          onChange={handleChange}
          error={errors.full_name}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <Input
          label="Cover Letter"
          name="cover_letter"
          type="textarea"
          value={values.cover_letter}
          onChange={handleChange}
          placeholder="Write down your biography here. Let the employers know who you are..."
          error={errors.cover_letter}
        />

        <div className="apply-modal__file">
          <label className="apply-modal__file-label" htmlFor="apply-modal-resume">
            Choose Resume
          </label>
          <input
            id="apply-modal-resume"
            className={fileInputClass}
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
          <p className="apply-modal__hint">
            {RESUME_ALLOWED_EXTENSIONS.join(", ").toUpperCase()}, up to {RESUME_MAX_SIZE_MB} MB
          </p>
          {errors.resume && <p className="apply-modal__error">{errors.resume}</p>}
        </div>

        <div className="apply-modal__actions">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Apply Now →</Button>
        </div>
      </form>
    </Modal>
  );
}

export default ApplyModal;