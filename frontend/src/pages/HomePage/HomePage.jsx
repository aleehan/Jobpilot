// src/pages/HomePage/HomePage.jsx
import Hero from "../../components/Hero/Hero.jsx";
import heroIllustration from "../../assets/homePage/illustration.svg";

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
    </main>
  );
}

export default HomePage;
