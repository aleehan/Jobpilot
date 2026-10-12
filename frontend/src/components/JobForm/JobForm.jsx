import Button from "../Button/Button.jsx";
import Input from "../Input/Input.jsx";
import { CATEGORIES, EMPLOYMENT_TYPES } from "../../utils/constants.js";
import "./JobForm.css";

/**
 * @typedef {Object} JobFormProps
 * @property {Object} [values] Значения полей, которыми управляет страница.
 * @property {Object<string, string>} [errors] Ошибки по именам полей.
 * @property {Function} [onChange] Обработчик события изменения поля.
 * @property {Function} [onSubmit] Обработчик отправки формы.
 * @property {string} [submitLabel] Подпись кнопки сохранения.
 */
/** @param {JobFormProps} props */
function JobForm({
  values = {},
  errors = {},
  onChange = () => {},
  onSubmit = (event) => event.preventDefault(),
  submitLabel = "Post Job",
}) {
  const fields = [
    { name: "title", label: "Job title", placeholder: "e.g. Frontend Developer", wide: true },
    { name: "company", label: "Company", placeholder: "Company name" },
    { name: "location", label: "Location", placeholder: "e.g. Almaty, Kazakhstan" },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: [{ value: "", label: "Select category" }, ...CATEGORIES],
    },
    {
      name: "employment_type",
      label: "Employment type",
      type: "select",
      options: [{ value: "", label: "Select employment type" }, ...EMPLOYMENT_TYPES],
    },
    {
      name: "salary_min",
      label: "Minimum salary (USD / month)",
      type: "number",
      placeholder: "1500",
    },
    {
      name: "salary_max",
      label: "Maximum salary (USD / month)",
      type: "number",
      placeholder: "2500",
    },
    {
      name: "description",
      label: "Job description",
      type: "textarea",
      placeholder: "Describe the role and responsibilities",
      wide: true,
    },
  ];

  return (
    <form className="job-form" onSubmit={onSubmit} noValidate>
      {Object.keys(errors).length > 0 && (
        <p className="job-form__error-summary" role="alert">
          Please correct the highlighted fields before saving.
        </p>
      )}
      <div className="job-form__grid">
        {fields.map(({ wide, ...field }) => (
          <div
            className={`job-form__field${wide ? " job-form__field--wide" : ""}`}
            key={field.name}
          >
            <Input
              {...field}
              type={field.type ?? "text"}
              value={values[field.name] ?? ""}
              error={errors[field.name] ?? ""}
              onChange={onChange}
              required
            />
          </div>
        ))}
      </div>
      <label className="job-form__toggle">
        <input
          className="job-form__checkbox"
          type="checkbox"
          name="is_active"
          checked={Boolean(values.is_active)}
          onChange={onChange}
        />
        <span className="job-form__toggle-text">Active vacancy — visible in the job catalogue</span>
      </label>
      <div className="job-form__actions">
        <Button type="submit">{submitLabel}</Button>
        <Button to="/dashboard" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default JobForm;
