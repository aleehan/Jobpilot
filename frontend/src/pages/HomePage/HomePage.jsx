import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../components/Hero/Hero.jsx";
import heroIllustration from "../../assets/homePage/illustration.svg";
import PopularVacancies from "../../components/PopularVacancies/PopularVacancies.jsx";
import HowItWorks from "../../components/HowItWorks/HowItWorks.jsx";

/** Ссылка на каталог с поиском: "Digital Marketing" → "/jobs?q=Digital+Marketing" */
function jobsSearchHref(query) {
  return "/jobs?" + new URLSearchParams({ q: query });
}

const popularVacancies = [
  { title: "Anesthesiologists", positions: "45,904" },
  { title: "Surgeons", positions: "50,364" },
  { title: "Obstetricians-Gynecologists", positions: "4,339" },
  { title: "Orthodontists", positions: "20,079" },
  { title: "Maxillofacial Surgeons", positions: "74,875" },
  { title: "Software Developer", positions: "43,359" },
  { title: "Psychiatrists", positions: "18,599" },
  { title: "Data Scientist", positions: "28,200" },
  { title: "Financial Manager", positions: "61,391" },
  { title: "Management Analysis", positions: "93,046" },
  { title: "IT Manager", positions: "50,963" },
  { title: "Operations Research Analysis", positions: "16,627" },
].map((vacancy) => ({ ...vacancy, href: jobsSearchHref(vacancy.title) }));

const suggestions = [
  { label: "Designer" },
  { label: "Developer" },
  { label: "Digital Marketing", isActive: true },
  { label: "Manager" },
  { label: "Analyst" },
].map((item) => ({ ...item, href: jobsSearchHref(item.label) }));

const stats = [
  { value: "175,324", label: "Live Job", icon: "briefcase" },
  { value: "97,354", label: "Companies", icon: "buildings" },
  { value: "384,154", label: "Candidates", icon: "users" },
  { value: "7,532", label: "New Jobs", icon: "briefcase" },
];

const howItWorksSteps = [
  {
    title: "Create account",
    description: "Aliquam facilisis egestas sapien, nec tempor leo tristique at.",
    icon: "user-plus",
  },
  {
    title: "Upload CV/Resume",
    description: "Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales",
    icon: "cloud-upload",
  },
  {
    title: "Find suitable job",
    description: "Phasellus quis eleifend ex. Morbi nec fringilla nibh.",
    icon: "search-plus",
  },
  {
    title: "Apply job",
    description: "Curabitur sit amet maximus ligula. Nam a nulla ante, Nam sodales purus.",
    icon: "badge-check",
  },
];

function HomePage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  function handleSearchSubmit(event) {
    event.preventDefault();

    // Добавляем в адрес только заполненные поля (раздел 5.2)
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    if (locationQuery.trim()) params.set("location", locationQuery.trim());

    const queryString = params.toString();
    navigate(queryString ? "/jobs?" + queryString : "/jobs");
  }

  return (
    <main>
      <Hero
        title="Find a job that suits your interest & skills."
        description="Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo, eget sollicitudin velit bestibulum."
        keywordPlaceholder="Job title, Keyword..."
        locationPlaceholder="Your Location"
        keywordValue={keyword}
        locationValue={locationQuery}
        searchButtonLabel="Find Job"
        suggestionLabel="Suggestion:"
        suggestions={suggestions}
        illustrationSrc={heroIllustration}
        illustrationAlt="Person working on a laptop"
        stats={stats}
        onKeywordChange={(event) => setKeyword(event.target.value)}
        onLocationChange={(event) => setLocationQuery(event.target.value)}
        onSearchSubmit={handleSearchSubmit}
      />
      <PopularVacancies
        title="Most Popular Vacancies"
        positionsLabel="Open Positions"
        vacancies={popularVacancies}
      />
      <HowItWorks title="How jobpilot work" steps={howItWorksSteps} />
    </main>
  );
}

export default HomePage;
