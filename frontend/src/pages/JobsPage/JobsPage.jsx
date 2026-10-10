import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import JobCard from "../../components/JobCard/JobCard.jsx";
import JobFilters from "../../components/JobFilters/JobFilters.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import { jobsTemp } from "../../mocks/jobsTemp.js";
import "./JobsPage.css";

// Приводим к нижнему регистру и убираем пробелы и дефисы: «Front-end» найдёт «Frontend»
const normalize = (text) => text.toLowerCase().replace(/[-\s]/g, "");

// Записывает параметр в адрес, а пустое значение удаляет
const setParam = (params, key, value) => {
  if (value) {
    params.set(key, String(value));
  } else {
    params.delete(key);
  }
};

function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "";
  const type = searchParams.get("type") || "";
  const salaryMin = Number(searchParams.get("salary_min")) || 0;

  // Текст в полях, пока пользователь печатает. В адрес он попадает по кнопке «Find Job».
  const [queryInput, setQueryInput] = useState(q);
  const [locationInput, setLocationInput] = useState(location);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Остальные параметры в адресе сохраняются
  const handleSubmit = () => {
    const next = new URLSearchParams(searchParams);
    setParam(next, "q", queryInput.trim());
    setParam(next, "location", locationInput.trim());
    setSearchParams(next);
  };

  const handlePopularSelect = (value) => {
    setQueryInput(value);
    const next = new URLSearchParams(searchParams);
    setParam(next, "q", value);
    setParam(next, "location", locationInput.trim());
    setSearchParams(next);
  };

  const handleFiltersApply = (filters) => {
    const next = new URLSearchParams(searchParams);
    setParam(next, "category", filters.category);
    setParam(next, "type", filters.type);
    setParam(next, "salary_min", filters.salary_min);
    setSearchParams(next);
    setIsFiltersOpen(false);
  };

  // Временно: вакансии из jobsTemp.
  // Когда появится JobsContext (У3), заменить на useJobs().
  const query = normalize(q);
  const place = normalize(location);
  const jobs = jobsTemp.filter((job) => {
    if (!job.is_active) {
      return false;
    }
    const matchesQuery =
      !query || normalize(job.title).includes(query) || normalize(job.company).includes(query);
    const matchesLocation = !place || normalize(job.location).includes(place);
    const matchesCategory = !category || job.category === category;
    const matchesType = !type || job.employment_type === type;
    const matchesSalary = !salaryMin || job.salary_max >= salaryMin;
    return matchesQuery && matchesLocation && matchesCategory && matchesType && matchesSalary;
  });

  return (
    <main className="jobs-page">
      <section className="jobs-page__header">
        <div className="jobs-page__container jobs-page__header-inner">
          <h1 className="jobs-page__title">Find Job</h1>
          <nav className="jobs-page__breadcrumbs" aria-label="Breadcrumb">
            <Link className="jobs-page__crumb" to="/">
              Home
            </Link>
            <span className="jobs-page__separator">/</span>
            <span className="jobs-page__crumb jobs-page__crumb--current">Find job</span>
          </nav>
        </div>
      </section>

      <section className="jobs-page__content">
        <div className="jobs-page__container">
          <div className="jobs-page__search">
            <SearchBar
              query={queryInput}
              location={locationInput}
              onQueryChange={setQueryInput}
              onLocationChange={setLocationInput}
              onSubmit={handleSubmit}
              onFiltersClick={() => setIsFiltersOpen(true)}
              onPopularSelect={handlePopularSelect}
            />
          </div>

          {jobs.length === 0 ? (
            <p className="jobs-page__empty">No jobs found</p>
          ) : (
            <div className="jobs-page__grid">
              {jobs.map((job, index) => (
                <JobCard key={job.id} job={job} featured={index < 2} />
              ))}
            </div>
          )}
        </div>
      </section>

      {isFiltersOpen && (
        <JobFilters
          values={{ category, type, salary_min: salaryMin }}
          onApply={handleFiltersApply}
          onClose={() => setIsFiltersOpen(false)}
        />
      )}
    </main>
  );
}

export default JobsPage;