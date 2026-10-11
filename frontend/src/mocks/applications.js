// Тестовые отклики. Владелец: Участник 2.
// Все принадлежат кандидату с id 1 (candidate@jobpilot.com).
// job_id ссылается на вакансии из mocks/jobs.js (Участник 3).

export const applicationsMock = [
  {
    id: 1,
    job_id: 1,
    user_id: 1,
    full_name: "Ivan Petrov",
    email: "candidate@jobpilot.com",
    phone: "+7 700 000 00 00",
    cover_letter: "Hello! I am interested in this position and have relevant experience.",
    resume_name: "ivan_petrov_cv.pdf",
    status: "pending",
    created_at: "2026-10-02",
  },
  {
    id: 2,
    job_id: 3,
    user_id: 1,
    full_name: "Ivan Petrov",
    email: "candidate@jobpilot.com",
    phone: "+7 700 000 00 00",
    cover_letter: "Good day! I would be happy to join your team.",
    resume_name: "ivan_petrov_cv.pdf",
    status: "reviewed",
    created_at: "2026-10-03",
  },
  {
    id: 3,
    job_id: 5,
    user_id: 1,
    full_name: "Ivan Petrov",
    email: "candidate@jobpilot.com",
    phone: "+7 700 000 00 00",
    cover_letter: "Hello! Please consider my application for this role.",
    resume_name: "ivan_petrov_resume.docx",
    status: "accepted",
    created_at: "2026-10-05",
  },
];