import { CATEGORIES, EMPLOYMENT_TYPES } from "./constants.js";

/**
 * Проверяет форму вакансии. Пустой объект означает отсутствие ошибок.
 * @param {Object} values Значения формы, зарплаты могут быть строками из Input.
 * @returns {Object<string, string>} Ошибки по именам полей.
 */
export function validateJob(values = {}) {
  const errors = {};
  for (const [name, label] of Object.entries({
    title: "Job title",
    company: "Company",
    location: "Location",
    description: "Description",
  })) {
    if (!String(values[name] ?? "").trim()) errors[name] = `${label} is required`;
  }
  if (!CATEGORIES.some((item) => item.value === values.category)) {
    errors.category = "Select a valid category";
  }
  if (!EMPLOYMENT_TYPES.some((item) => item.value === values.employment_type)) {
    errors.employment_type = "Select a valid employment type";
  }
  for (const name of ["salary_min", "salary_max"]) {
    const value = values[name];
    if (value === null || value === undefined || String(value).trim() === "") {
      errors[name] = "Salary is required";
    } else if (
      !["string", "number"].includes(typeof value) ||
      !Number.isFinite(Number(value)) ||
      Number(value) <= 0
    ) {
      errors[name] = "Enter a positive salary";
    }
  }
  if (
    !errors.salary_min &&
    !errors.salary_max &&
    Number(values.salary_min) > Number(values.salary_max)
  ) {
    errors.salary_max = "Maximum salary must be at least the minimum salary";
  }
  return errors;
}

export default validateJob;
