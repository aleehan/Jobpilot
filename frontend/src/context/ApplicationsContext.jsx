import { createContext, useContext, useState } from "react";
import { applicationsMock } from "../mocks/applications.js";

// Контекст откликов. Владелец: Участник 2.
// Контракт описан в разделе 8.3 документации, сигнатуры менять нельзя.

const ApplicationsContext = createContext(null);

/**
 * @typedef {Object} ApplicationsProviderProps
 * @property {React.ReactNode} children вложенные компоненты
 */

/** @param {ApplicationsProviderProps} props */
export function ApplicationsProvider({ children = null }) {
  const [applications, setApplications] = useState(applicationsMock);

  // (data) => новый отклик. id, status и created_at проставляются сами.
  const addApplication = (data) => {
    const nextId = applications.reduce((max, item) => Math.max(max, item.id), 0) + 1;
    const newApplication = {
      ...data,
      id: nextId,
      status: "pending",
      created_at: new Date().toISOString().slice(0, 10),
    };
    setApplications((prev) => [...prev, newApplication]);
    return newApplication;
  };

  // (id, status) => void
  const updateStatus = (id, status) => {
    setApplications((prev) =>
      prev.map((item) => (item.id === Number(id) ? { ...item, status } : item)),
    );
  };

  // (userId) => массив откликов пользователя
  const getApplicationsByUser = (userId) =>
    applications.filter((item) => item.user_id === Number(userId));

  // (jobId) => массив откликов на вакансию
  const getApplicationsByJob = (jobId) =>
    applications.filter((item) => item.job_id === Number(jobId));

  // (userId, jobId) => boolean
  const hasApplied = (userId, jobId) =>
    applications.some((item) => item.user_id === Number(userId) && item.job_id === Number(jobId));

  const value = {
    applications,
    addApplication,
    updateStatus,
    getApplicationsByUser,
    getApplicationsByJob,
    hasApplied,
  };

  return <ApplicationsContext.Provider value={value}>{children}</ApplicationsContext.Provider>;
}

export function useApplications() {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error("useApplications must be used inside ApplicationsProvider");
  }
  return context;
}