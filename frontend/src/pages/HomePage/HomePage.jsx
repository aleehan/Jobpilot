import Hero from "../../components/Hero/Hero.jsx";
import heroIllustration from "../../assets/homePage/illustration.svg";
import PopularVacancies from "../../components/PopularVacancies/PopularVacancies.jsx";
import HowItWorks from "../../components/HowItWorks/HowItWorks.jsx";

const popularVacancies = [
  {
    title: "Anesthesiologists",
    positions: "45,904",
    href: "/jobs?q=anesthesiologists",
  },
  { title: "Surgeons", positions: "50,364", href: "/jobs?q=surgeons" },
  {
    title: "Obstetricians-Gynecologists",
    positions: "4,339",
    href: "/jobs?q=obstetricians-gynecologists",
  },
  {
    title: "Orthodontists",
    positions: "20,079",
    href: "/jobs?q=orthodontists",
  },
  {
    title: "Maxillofacial Surgeons",
    positions: "74,875",
    href: "/jobs?q=maxillofacial-surgeons",
  },
  {
    title: "Software Developer",
    positions: "43,359",
    href: "/jobs?q=software-developer",
  },
  {
    title: "Psychiatrists",
    positions: "18,599",
    href: "/jobs?q=psychiatrists",
  },
  {
    title: "Data Scientist",
    positions: "28,200",
    href: "/jobs?q=data-scientist",
  },
  {
    title: "Financial Manager",
    positions: "61,391",
    href: "/jobs?q=financial-manager",
  },
  {
    title: "Management Analysis",
    positions: "93,046",
    href: "/jobs?q=management-analysis",
  },
  { title: "IT Manager", positions: "50,963", href: "/jobs?q=it-manager" },
  {
    title: "Operations Research Analysis",
    positions: "16,627",
    href: "/jobs?q=operations-research-analysis",
  },
];

const suggestions = [
  { label: "Designer", href: "/jobs?q=designer" },
  { label: "Programing", href: "/jobs?q=programing" },
  {
    label: "Digital Marketing",
    href: "/jobs?q=digital-marketing",
    isActive: true,
  },
  { label: "Video", href: "/jobs?q=video" },
  { label: "Animation", href: "/jobs?q=animation" },
];

const stats = [
  { value: "1,75,324", label: "Live Job", icon: "briefcase" },
  { value: "97,354", label: "Companies", icon: "buildings" },
  { value: "38,47,154", label: "Candidates", icon: "users" },
  { value: "7,532", label: "New Jobs", icon: "briefcase" },
];

const howItWorksSteps = [
  {
    title: "Create account",
    description:
      "Aliquam facilisis egestas sapien, nec tempor leo tristique at.",
    icon: "user-plus",
  },
  {
    title: "Upload CV/Resume",
    description:
      "Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales",
    icon: "cloud-upload",
  },
  {
    title: "Find suitable job",
    description: "Phasellus quis eleifend ex. Morbi nec fringilla nibh.",
    icon: "search-plus",
  },
  {
    title: "Apply job",
    description:
      "Curabitur sit amet maximus ligula. Nam a nulla ante, Nam sodales purus.",
    icon: "badge-check",
  },
];

function HomePage() {
  return (
    <main>
      <Hero
        title="Find a job that suits your interest & skills."
        description="Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo, eget sollicitudin velit bestibulum."
        keywordPlaceholder="Job title, Keyword..."
        locationPlaceholder="Your Location"
        keywordValue=""
        locationValue=""
        searchButtonLabel="Find Job"
        suggestionLabel="Suggestion:"
        suggestions={suggestions}
        illustrationSrc={heroIllustration}
        illustrationAlt="Person working on a laptop"
        stats={stats}
        onKeywordChange={() => {}}
        onLocationChange={() => {}}
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
