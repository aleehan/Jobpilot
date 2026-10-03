// src/components/PopularVacancies/PopularVacancies.jsx
import "./PopularVacancies.css";

function PopularVacancies({
  title = "",
  positionsLabel = "Open Positions",
  vacancies = [],
}) {
  return (
    <section
      className="popular-vacancies"
      aria-labelledby="popular-vacancies-title"
    >
      <div className="container">
        <h2 id="popular-vacancies-title" className="popular-vacancies__title">
          {title}
        </h2>

        <ul className="popular-vacancies__list">
          {vacancies.map((vacancy) => (
            <li key={vacancy.href} className="popular-vacancies__item">
              <a
                href={vacancy.href}
                className={`popular-vacancies__link${vacancy.isActive ? " popular-vacancies__link--active" : ""}`}
              >
                <span className="popular-vacancies__name">{vacancy.title}</span>
                <span className="popular-vacancies__count">
                  {vacancy.positions} {positionsLabel}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default PopularVacancies;
