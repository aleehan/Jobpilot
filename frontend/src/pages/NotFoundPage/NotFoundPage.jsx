import Button from "../../components/Button/Button.jsx";
import robotImage from "../../assets/notFoundPage/robot_404.svg";
import "./NotFoundPage.css";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="not-found-page">
      <div className="container not-found-page__inner">
        <div className="not-found-page__content">
          <h1 className="not-found-page__title">Oops! Page not found</h1>
          <p className="not-found-page__text">
            Something went wrong. It&apos;s look like the link is broken or the page is removed.
          </p>

          <div className="not-found-page__actions">
            <Button to="/">
              Home
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
            <Button variant="outline" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </div>

        <div className="not-found-page__media">
          <img className="not-found-page__image" src={robotImage} alt="Broken robot" />
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
