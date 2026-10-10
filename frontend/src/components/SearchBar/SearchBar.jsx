import "./SearchBar.css";

const POPULAR_SEARCHES = [
  "Front-end",
  "Back-end",
  "Development",
  "PHP",
  "Laravel",
  "Bootstrap",
  "Developer",
  "Team Lead",
  "Product Testing",
  "Javascript",
];

/**
 * @typedef {Object} SearchBarProps
 * @property {string} [query] текст в поле поиска
 * @property {string} [location] текст в поле локации
 * @property {(value: string) => void} [onQueryChange] ввод в поле поиска
 * @property {(value: string) => void} [onLocationChange] ввод в поле локации
 * @property {() => void} [onSubmit] нажатие «Find Job»
 * @property {() => void} [onFiltersClick] нажатие «Filters»
 * @property {(value: string) => void} [onPopularSelect] выбор популярного запроса
 */

/** @param {SearchBarProps} props */
function SearchBar({
  query = "",
  location = "",
  onQueryChange = () => {},
  onLocationChange = () => {},
  onSubmit = () => {},
  onFiltersClick = () => {},
  onPopularSelect = () => {},
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className="search-bar">
      <form className="search-bar__form" onSubmit={handleSubmit}>
        <label className="search-bar__field">
          <svg
            className="search-bar__icon search-bar__icon--primary"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            className="search-bar__input"
            type="text"
            name="q"
            value={query}
            placeholder="Search by: Job title, Position, Keywords..."
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </label>

        <label className="search-bar__field search-bar__field--location">
          <svg
            className="search-bar__icon search-bar__icon--primary"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <input
            className="search-bar__input"
            type="text"
            name="location"
            value={location}
            placeholder="City, state or zip code"
            onChange={(event) => onLocationChange(event.target.value)}
          />
          <svg
            className="search-bar__icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="7" />
            <circle cx="12" cy="12" r="2" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
        </label>

        <div className="search-bar__actions">
          <button className="search-bar__filters" type="button" onClick={onFiltersClick}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
              <circle cx="16" cy="7" r="2" />
              <circle cx="8" cy="17" r="2" />
            </svg>
            Filters
          </button>
          <button className="search-bar__submit" type="submit">
            Find Job
          </button>
        </div>
      </form>

      <div className="search-bar__popular">
        <span className="search-bar__popular-label">Popular searches:</span>
        {POPULAR_SEARCHES.map((item) => (
          <button
            key={item}
            className={
              item.toLowerCase() === query.trim().toLowerCase()
                ? "search-bar__chip search-bar__chip--active"
                : "search-bar__chip"
            }
            type="button"
            onClick={() => onPopularSelect(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;