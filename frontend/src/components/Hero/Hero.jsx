import StatCard from "../StatCard/StatCard.jsx";
import "./Hero.css";

function Hero({
  title = "",
  description = "",
  keywordPlaceholder = "",
  locationPlaceholder = "",
  keywordValue = "",
  locationValue = "",
  searchButtonLabel = "Find Job",
  suggestionLabel = "Suggestion:",
  suggestions = [],
  illustrationSrc = "",
  illustrationAlt = "",
  stats = [],
  onKeywordChange,
  onLocationChange,
  onSearchSubmit,
}) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__top">
          <div className="hero__content">
            <h1 id="hero-title" className="hero__title">
              {title}
            </h1>
            <p className="hero__description">{description}</p>
            <form
              className="hero__search"
              role="search"
              onSubmit={onSearchSubmit}
            >
              <label className="hero__field">
                <span className="visually-hidden">{keywordPlaceholder}</span>
                <svg
                  className="hero__field-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="m20 20-3.5-3.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type="search"
                  name="keyword"
                  className="hero__input"
                  placeholder={keywordPlaceholder}
                  value={keywordValue}
                  onChange={onKeywordChange}
                />
              </label>

              <span className="hero__divider" aria-hidden="true" />

              <label className="hero__field">
                <span className="visually-hidden">{locationPlaceholder}</span>
                <svg
                  className="hero__field-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="9.5"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <input
                  type="text"
                  name="location"
                  className="hero__input"
                  placeholder={locationPlaceholder}
                  value={locationValue}
                  onChange={onLocationChange}
                />
              </label>

              <button type="submit" className="hero__button">
                {searchButtonLabel}
              </button>
            </form>

            {suggestions.length > 0 && (
              <p className="hero__suggestions">
                <span className="hero__suggestions-label">
                  {suggestionLabel}
                </span>{" "}
                {suggestions.map((item, index) => (
                  <span key={item.href}>
                    <a
                      href={item.href}
                      className={`hero__suggestion${item.isActive ? " hero__suggestion--active" : ""}`}
                    >
                      {item.label}
                    </a>
                    {index < suggestions.length - 1 ? ", " : "."}
                  </span>
                ))}
              </p>
            )}
          </div>

          <div className="hero__illustration">
            <img
              src={illustrationSrc}
              alt={illustrationAlt}
              width="492"
              height="382"
            />
          </div>
        </div>

        <ul className="hero__stats">
          {stats.map((stat) => (
            <li key={stat.label} className="hero__stats-item">
              <StatCard {...stat} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Hero;
