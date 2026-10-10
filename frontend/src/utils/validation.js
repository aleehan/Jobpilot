const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmpty(value) {
  return String(value ?? "").trim() === "";
}

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(String(value ?? "").trim());
}

export function validateLogin(values) {
  const errors = {};

  if (isEmpty(values.email)) errors.email = "Email is required";
  else if (!isValidEmail(values.email)) errors.email = "Enter a valid email";

  if (isEmpty(values.password)) errors.password = "Password is required";

  return errors;
}

export function validateRegister(values) {
  const errors = {};

  if (isEmpty(values.first_name)) errors.first_name = "First name is required";
  if (isEmpty(values.last_name)) errors.last_name = "Last name is required";

  if (isEmpty(values.email)) errors.email = "Email is required";
  else if (!isValidEmail(values.email)) errors.email = "Enter a valid email";

  if (isEmpty(values.password)) errors.password = "Password is required";
  else if (values.password.length < 8) errors.password = "Password must be at least 8 characters";

  if (isEmpty(values.password_confirm)) errors.password_confirm = "Confirm your password";
  else if (values.password !== values.password_confirm) {
    errors.password_confirm = "Passwords do not match";
  }

  return errors;
}

export function validateProfile(values) {
  const errors = {};

  if (isEmpty(values.first_name)) errors.first_name = "First name is required";
  if (isEmpty(values.last_name)) errors.last_name = "Last name is required";

  if (isEmpty(values.email)) errors.email = "Email is required";
  else if (!isValidEmail(values.email)) errors.email = "Enter a valid email";

  return errors;
}
