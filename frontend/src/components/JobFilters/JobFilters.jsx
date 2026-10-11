import { useEffect, useState } from "react";
import { CATEGORIES, EMPLOYMENT_TYPES } from "../../utils/constants.js";
import "./JobFilters.css";

const SALARY_OPTIONS = [
  { value: 0, label: "Any salary" },
  { value: 500, label: "$500+ per month" },
  { value: 1000, label: "$1,000+ per month" },
  { value: 2000, label: "$2,000+ per month" },
  { value: 3000, label: "$3,000+ per month" },
];

const EMPTY_FILTERS = { category: "", type: "", salary_min: 0 };

/**
 * @typedef {Object} JobFiltersValues
 * @property {string} category значение из CATEGORIES или пустая строка
 * @property {string} type значение из EMPLOYMENT_TYPES или пустая строка
 * @property {number} salary_min минимальная зарплата, 0 — без ограничения
 */

/**
 * @typedef {Object} JobFiltersProps
 * @property {JobFiltersValues} [values] текущие применённые фильтры
 * @property {(filters: JobFiltersValues) => void} [onApply] нажатие «Apply Filter» или «Clear all»
 * @property {() => void} [onClose] закрытие панели
 */

/** @param {JobFiltersProps} props */
function JobFilters({ values = EMPTY_FILTERS, onApply = () => {}, onClose = () => {} }) {
  // Выбор хранится здесь, пока пользователь не нажмёт «Apply Filter»
  const [category, setCategory] = useState(values.category);
  const [type, setType] = useState(values.type);
  const [salaryMin, setSalaryMin] = useState(values.salary_min);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const categoryItem = CATEGORIES.find((item) => item.value === category);
  const typeItem = EMPLOYMENT_TYPES.find((item) => item.value === type);
  const salaryItem = SALARY_OPTIONS.find((item) => item.value === salaryMin && item.value > 0);

  const chips = [];
  if (categoryItem) {
    chips.push({ key: "category", label: categoryItem.label, onRemove: () => setCategory("") });
  }
  if (typeItem) {
    chips.push({ key: "type", label: typeItem.label, onRemove: () => setType("") });
  }
  if (salaryItem) {
    chips.push({ key: "salary", label: salaryItem.label, onRemove: () => setSalaryMin(0) });
  }

  const isRemote = type === "remote";

  const handleApply = () => {
    onApply({ category, type, salary_min: salaryMin });
  };

  const handleClear = () => {
    onApply(EMPTY_FILTERS);
  };

  return (
    <div className="job-filters" role="dialog" aria-modal="true" aria-label="Filters">
      <aside className="job-filters__panel">
        <div className="job-filters__body">
          <div className="job-filters__top">
            <h2 className="job-filters__title">Filters</h2>
            <button
              className="job-filters__close"
              type="button"
              aria-label="Close filters"
              onClick={onClose}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <section className="job-filters__section">
            <div className="job-filters__row">
              <p className="job-filters__label">Active Filters:</p>
              {chips.length > 0 && (
                <button className="job-filters__clear" type="button" onClick={handleClear}>
                  Clear all
                </button>
              )}
            </div>
            {chips.length === 0 ? (
              <p className="job-filters__hint">No filters selected</p>
            ) : (
              <ul className="job-filters__chips">
                {chips.map((chip) => (
                  <li key={chip.key} className="job-filters__chip">
                    {chip.label}
                    <button
                      className="job-filters__chip-remove"
                      type="button"
                      aria-label={"Remove " + chip.label}
                      onClick={chip.onRemove}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="job-filters__section">
            <h3 className="job-filters__heading">Industry</h3>
            <ul className="job-filters__list">
              <li>
                <button
                  className={
                    category === ""
                      ? "job-filters__option job-filters__option--active"
                      : "job-filters__option"
                  }
                  type="button"
                  onClick={() => setCategory("")}
                >
                  All Category
                </button>
              </li>
              {CATEGORIES.map((item) => (
                <li key={item.value}>
                  <button
                    className={
                      category === item.value
                        ? "job-filters__option job-filters__option--active"
                        : "job-filters__option"
                    }
                    type="button"
                    onClick={() => setCategory(item.value)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="job-filters__section">
            <h3 className="job-filters__heading">Job Type</h3>
            <label className="job-filters__radio">
              <input
                type="radio"
                name="job-type"
                checked={type === ""}
                onChange={() => setType("")}
              />
              All Types
            </label>
            {EMPLOYMENT_TYPES.map((item) => (
              <label key={item.value} className="job-filters__radio">
                <input
                  type="radio"
                  name="job-type"
                  checked={type === item.value}
                  onChange={() => setType(item.value)}
                />
                {item.label}
              </label>
            ))}
          </section>

          <section className="job-filters__section">
            <h3 className="job-filters__heading">Salary (monthly)</h3>
            {SALARY_OPTIONS.map((item) => (
              <label key={item.value} className="job-filters__radio">
                <input
                  type="radio"
                  name="job-salary"
                  checked={salaryMin === item.value}
                  onChange={() => setSalaryMin(item.value)}
                />
                {item.label}
              </label>
            ))}
          </section>
        </div>

        <div className="job-filters__footer">
          <label className="job-filters__switch-label">
            <button
              className={
                isRemote ? "job-filters__switch job-filters__switch--on" : "job-filters__switch"
              }
              type="button"
              role="switch"
              aria-checked={isRemote}
              onClick={() => setType(isRemote ? "" : "remote")}
            >
              <span className="job-filters__switch-thumb" />
            </button>
            Remote Job
          </label>
          <button className="job-filters__apply" type="button" onClick={handleApply}>
            Apply Filter
          </button>
        </div>
      </aside>

      <button
        className="job-filters__overlay"
        type="button"
        aria-label="Close filters"
        onClick={onClose}
      />
    </div>
  );
}

export default JobFilters;

