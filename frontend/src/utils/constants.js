// Общие константы проекта. Владелец: Участник 2.

export const ROLES = { CANDIDATE: "candidate", EMPLOYER: "employer" };

export const CATEGORIES = [
  { value: "design", label: "Design" },
  { value: "development", label: "Development" },
  { value: "marketing", label: "Marketing" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "management", label: "Management" },
];

export const EMPLOYMENT_TYPES = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "internship", label: "Internship" },
  { value: "remote", label: "Remote" },
  { value: "contract", label: "Contract" },
];

export const APPLICATION_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "reviewed", label: "Reviewed" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
];

export const RESUME_ALLOWED_EXTENSIONS = ["pdf", "doc", "docx"];

export const RESUME_MAX_SIZE_MB = 5;