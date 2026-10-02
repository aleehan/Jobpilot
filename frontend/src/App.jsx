import Header from "./components/Header/Header.jsx";

const navLinks = [
    { label: 'Home', href: '/', isActive: true },
    { label: 'Find Job', href: '/jobs' },
    { label: 'Employers', href: '/employers' },
    { label: 'Candidates', href: '/candidates' },
    { label: 'Pricing Plans', href: '/pricing' },
    { label: 'Customer Supports', href: '/support' },
]

function App() {

  return (
    <>
      <Header
          logoText="Jobpilot"
          logoHref="/"
          navLinks={navLinks}
          phone="+1-202-555-0178"
          language={{ label: 'English', flagSrc: '/flags/us.svg' }}
          country={{ label: 'India', flagSrc: '/flags/in.svg' }}
          searchPlaceholder="Job title, keyword, company"
          searchValue=""
          signInLabel="Sign In"
          postJobLabel="Post A Jobs"
          menuOpenLabel="Open menu"
          menuCloseLabel="Close menu"
          isMenuOpen={false}
          onSearchChange={() => {}}
      />
    </>
  )
}

export default App
