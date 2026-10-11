import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Button from "../../components/Button/Button.jsx";
import Input from "../../components/Input/Input.jsx";
import { validateRegister } from "../../utils/validation.js";
import "./RegisterPage.css";

const INITIAL_VALUES = {
  role: "candidate",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirm: "",
  terms: false,
};

/** Иконка глаза: открытый, или перечёркнутый, когда пароль виден */
function EyeIcon({ isCrossed = false }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      {isCrossed && (
        <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

function RegisterPage() {
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    // У чекбокса значение лежит в checked (true/false), у остальных полей — в value
    const newValue = type === "checkbox" ? checked : value;

    setValues({ ...values, [name]: newValue });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  }

  function selectRole(role) {
    setValues({ ...values, role });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Сценарии 1–3 + согласие с условиями
    const validationErrors = validateRegister(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Сценарий 4: занятый email
    const result = register(values);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    navigate("/");
  }

  /** Класс кнопки роли: активная получает модификатор --active */
  function roleClass(role) {
    return values.role === role
      ? "register-page__role register-page__role--active"
      : "register-page__role";
  }

  return (
    <main className="register-page">
      <div className="register-page__top">
        <div className="container">
          <Link to="/" className="register-page__logo">
            <svg
              className="register-page__logo-icon"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="7"
                width="18"
                height="13"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Jobpilot
          </Link>
        </div>
      </div>

      <div className="register-page__content">
        <section className="register-page__card">
          <h1 className="register-page__title">Create account.</h1>
          <p className="register-page__subtitle">
            Already have account?{" "}
            <Link to="/login" className="register-page__link">
              Log In
            </Link>
          </p>

          <form className="register-page__form" onSubmit={handleSubmit} noValidate>
            <div className="register-page__roles">
              <p className="register-page__roles-title">Create account as a</p>
              <div className="register-page__roles-list">
                <button
                  type="button"
                  className={roleClass("candidate")}
                  aria-pressed={values.role === "candidate"}
                  onClick={() => selectRole("candidate")}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M6.5 18.5c1.2-2 3.2-3 5.5-3s4.3 1 5.5 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Candidate
                </button>
                <button
                  type="button"
                  className={roleClass("employer")}
                  aria-pressed={values.role === "employer"}
                  onClick={() => selectRole("employer")}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M3 21h18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5 21V4h9v17M14 9h5v12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 8h3M8 12h3M8 16h3M16.5 13h0M16.5 17h0"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Employer
                </button>
              </div>
            </div>

            <div className="register-page__row">
              <Input
                name="first_name"
                placeholder="First Name"
                value={values.first_name}
                onChange={handleChange}
                error={errors.first_name}
              />
              <Input
                name="last_name"
                placeholder="Last Name"
                value={values.last_name}
                onChange={handleChange}
                error={errors.last_name}
              />
            </div>

            <Input
              name="email"
              type="email"
              placeholder="Email address"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
            />

            <div className="register-page__password">
              <Input
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                error={errors.password}
              />
              <button
                type="button"
                className="register-page__eye"
                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <EyeIcon isCrossed={isPasswordVisible} />
              </button>
            </div>

            <div className="register-page__password">
              <Input
                name="password_confirm"
                type={isConfirmVisible ? "text" : "password"}
                placeholder="Confirm Password"
                value={values.password_confirm}
                onChange={handleChange}
                error={errors.password_confirm}
              />
              <button
                type="button"
                className="register-page__eye"
                aria-label={isConfirmVisible ? "Hide password" : "Show password"}
                onClick={() => setIsConfirmVisible(!isConfirmVisible)}
              >
                <EyeIcon isCrossed={isConfirmVisible} />
              </button>
            </div>

            <div>
              <label className="register-page__terms">
                <input
                  type="checkbox"
                  name="terms"
                  className="register-page__checkbox"
                  checked={values.terms}
                  onChange={handleChange}
                />
                <span>
                  I&apos;ve read and agree with your{" "}
                  <span className="register-page__terms-accent">Terms of Services</span>
                </span>
              </label>
              {errors.terms && <p className="register-page__terms-error">{errors.terms}</p>}
            </div>

            <Button type="submit" size="lg" fullWidth>
              Create Account
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default RegisterPage;
