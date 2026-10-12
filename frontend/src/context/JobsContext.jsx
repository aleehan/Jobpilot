import { createContext, useContext, useRef, useState } from "react";
import initialJobs from "../mocks/jobs.js";

const JobsContext = createContext(null);

function today() {
  const date = new Date();
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

/** Только разрешённые редактируемые поля; служебные поля сюда не входят. */
function editableFields(data = {}) {
  const result = {};
  for (const key of [
    "title",
    "company",
    "category",
    "employment_type",
    "location",
    "description",
  ]) {
    if (Object.prototype.hasOwnProperty.call(data, key))
      result[key] = String(data[key] ?? "").trim();
  }
  for (const key of ["salary_min", "salary_max"]) {
    if (Object.prototype.hasOwnProperty.call(data, key)) result[key] = Number(data[key]);
  }
  if (typeof data.is_active === "boolean") result.is_active = data.is_active;
  if (Array.isArray(data.requirements)) result.requirements = [...data.requirements];
  return result;
}

/**
 * @param {Object} props
 * @param {import("react").ReactNode} [props.children=null] Дочерние элементы.
 */
export function JobsProvider({ children = null }) {
  const [jobs, setJobs] = useState(() =>
    initialJobs.map((job) => ({ ...job, requirements: [...job.requirements] })),
  );
  // Счётчик не зависит от длины массива: после удаления id не повторяются.
  const nextId = useRef(Math.max(0, ...initialJobs.map((job) => job.id)) + 1);

  function getJobById(id) {
    return jobs.find((job) => job.id === Number(id));
  }

  function addJob(data = {}) {
    const newJob = {
      title: "",
      company: "",
      category: "",
      employment_type: "",
      salary_min: 0,
      salary_max: 0,
      location: "",
      description: "",
      requirements: [],
      is_active: true,
      ...editableFields(data),
      employer_id: Number(data.employer_id),
      id: nextId.current++,
      created_at: today(),
    };
    setJobs((current) => [...current, newJob]);
    return newJob;
  }

  function updateJob(id, data = {}) {
    const changes = editableFields(data);
    setJobs((current) =>
      current.map((job) => (job.id === Number(id) ? { ...job, ...changes } : job)),
    );
  }

  function deleteJob(id) {
    setJobs((current) => current.filter((job) => job.id !== Number(id)));
  }

  return (
    <JobsContext.Provider value={{ jobs, getJobById, addJob, updateJob, deleteJob }}>
      {children}
    </JobsContext.Provider>
  );
}

/** Общий контракт раздела 8.2. Все изменения пока существуют только в памяти. */
export function useJobs() {
  const context = useContext(JobsContext);
  if (!context) throw new Error("useJobs must be used inside JobsProvider");
  return context;
}

export default JobsProvider;
