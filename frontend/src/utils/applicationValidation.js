import { RESUME_ALLOWED_EXTENSIONS, RESUME_MAX_SIZE_MB } from "./constants.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Проверка формы отклика (сценарий 5 из раздела 7.5). Владелец: Участник 2.
 * Возвращает объект ошибок, где ключ — name поля формы.
 * Пустой объект {} означает, что ошибок нет.
 * @param {{ full_name: string, email: string, phone: string, cover_letter: string }} values
 * @param {File | null} resumeFile выбранный файл резюме
 */
export function validateApplication(values, resumeFile) {
  const errors = {};

  if (!values.full_name.trim()) {
    errors.full_name = "Enter your full name";
  }

  if (!values.email.trim()) {
    errors.email = "Enter your email";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email";
  }

  if (!values.phone.trim()) {
    errors.phone = "Enter your phone number";
  }

  if (!values.cover_letter.trim()) {
    errors.cover_letter = "Write a short cover letter";
  }

  if (!resumeFile) {
    errors.resume = "Attach your resume";
  } else {
    const extension = resumeFile.name.split(".").pop().toLowerCase();
    if (!RESUME_ALLOWED_EXTENSIONS.includes(extension)) {
      errors.resume = "Resume must be a PDF, DOC or DOCX file";
    } else if (resumeFile.size > RESUME_MAX_SIZE_MB * 1024 * 1024) {
      errors.resume = "Resume must be " + RESUME_MAX_SIZE_MB + " MB or smaller";
    }
  }

  return errors;
}