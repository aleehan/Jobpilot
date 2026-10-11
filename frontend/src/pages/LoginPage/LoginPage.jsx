import { Link } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import Input from "../../components/Input/Input.jsx";
import "./LoginPage.css";

function LoginPage() {
  return (
    <main className="login-page">
      <div className="login-page__top">
        <div className="container">
          <Link to="/" className="login-page__logo">
            <svg
              className="login-page__logo-icon"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_4112_12807)">
                <path
                  d="M33.7512 11.25H6.25122C5.56086 11.25 5.00122 11.8096 5.00122 12.5V32.5C5.00122 33.1904 5.56086 33.75 6.25122 33.75H33.7512C34.4416 33.75 35.0012 33.1904 35.0012 32.5V12.5C35.0012 11.8096 34.4416 11.25 33.7512 11.25Z"
                  stroke="#0A65CC"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M26.25 11.25V8.75C26.25 8.08696 25.9866 7.45107 25.5178 6.98223C25.0489 6.51339 24.413 6.25 23.75 6.25H16.25C15.587 6.25 14.9511 6.51339 14.4822 6.98223C14.0134 7.45107 13.75 8.08696 13.75 8.75V11.25"
                  stroke="#0A65CC"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M35.0013 19.7358C30.4424 22.3734 25.2669 23.7583 20 23.75C14.734 23.7583 9.55941 22.3739 5.00104 19.7371"
                  stroke="#0A65CC"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.125 18.75H21.875"
                  stroke="#0A65CC"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_4112_12807">
                  <rect width="40" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Jobpilot
          </Link>
        </div>
      </div>

      <div className="login-page__content">
        <section className="login-page__card">
          <h1 className="login-page__title">Sign in</h1>
          <p className="login-page__subtitle">
            Don&apos;t have account?{" "}
            <Link to="/register" className="login-page__link">
              Create Account
            </Link>
          </p>

          {/* preventDefault временно: чтобы кнопка не перезагружала страницу, пока нет логики */}
          <form
            className="login-page__form"
            onSubmit={(event) => event.preventDefault()}
            noValidate
          >
            <Input name="email" type="email" placeholder="Email address" />

            <div className="login-page__password">
              <Input name="password" type="password" placeholder="Password" />
              <button type="button" className="login-page__eye" aria-label="Show password">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            <div className="login-page__options">
              <label className="login-page__remember">
                <input type="checkbox" name="remember" className="login-page__checkbox" />
                Remember Me
              </label>
              <button type="button" className="login-page__forgot">
                Forget password
              </button>
            </div>

            <Button type="submit" size="lg" fullWidth>
              Sign In
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

export default LoginPage;
