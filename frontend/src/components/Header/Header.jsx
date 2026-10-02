const MENU_ID = 'header-mobile-menu';

const BriefcaseIcon = () => (
    <svg className="header__logo-icon" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_4112_12807)">
            <path
                d="M33.7512 11.25H6.25122C5.56086 11.25 5.00122 11.8096 5.00122 12.5V32.5C5.00122 33.1904 5.56086 33.75 6.25122 33.75H33.7512C34.4416 33.75 35.0012 33.1904 35.0012 32.5V12.5C35.0012 11.8096 34.4416 11.25 33.7512 11.25Z"
                stroke="#0A65CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path
                d="M26.25 11.25V8.75C26.25 8.08696 25.9866 7.45107 25.5178 6.98223C25.0489 6.51339 24.413 6.25 23.75 6.25H16.25C15.587 6.25 14.9511 6.51339 14.4822 6.98223C14.0134 7.45107 13.75 8.08696 13.75 8.75V11.25"
                stroke="#0A65CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path
                d="M35.0013 19.7358C30.4424 22.3734 25.2669 23.7583 20 23.75C14.734 23.7583 9.55941 22.3739 5.00104 19.7371"
                stroke="#0A65CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.125 18.75H21.875" stroke="#0A65CC" strokeWidth="2.5" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </g>
        <defs>
            <clipPath id="clip0_4112_12807">
                <rect width="40" height="40" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);

const SearchIcon = () => (
    <svg className="header__search-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
        <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const PhoneIcon = () => (
    <svg className="header__phone-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
            d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
        />
    </svg>
);

const ChevronIcon = () => (
    <svg className="header__chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

function Header({
                    logoText = 'Jobpilot',
                    logoHref = '/',
                    navLinks = [],
                    phone = '',
                    language = {label: '', flagSrc: '' },
                    country = { label: '', flagSrc: '' },
                    searchPlaceholder = '',
                    searchValue = '',
                    signInLabel = 'Sign In',
                    postJobLabel = 'Post A Jobs',
                    menuOpenLabel = 'Open menu',
                    menuCloseLabel = 'Close menu',
                    isMenuOpen = false,
                    onLanguageClick,
                    onCountryClick,
                    onSearchChange,
                    onSearchSubmit,
                    onSignInClick,
                    onPostJobClick,
                    onMenuToggle,
                }) {
    const renderNavList = (modifier) => (
        <ul className={`header__nav-list header__nav-list--${modifier}`}>
            {navLinks.map((link) => (
                <li key={link.href} className="header__nav-item">
                    <a
                        href={link.href}
                        className={`header__nav-link${link.isActive ? ' header__nav-link--active' : ''}`}
                        aria-current={link.isActive ? 'page' : undefined}
                    >
                        {link.label}
                    </a>
                </li>
            ))}
        </ul>
    );

    const renderPhone = () => (
        <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="header__phone">
            <PhoneIcon />
            <span>{phone}</span>
        </a>
    );

    const renderLanguage = () => (
        <button type="button" className="header__select header__select--language" onClick={onLanguageClick}>
            <img src={language.flagSrc} alt="" className="header__flag" width="24" height="16" />
            <span>{language.label}</span>
            <ChevronIcon />
        </button>
    );

    const renderActions = (modifier) => (
        <div className={`header__actions header__actions--${modifier}`}>
            <button type="button" className="header__button header__button--outline" onClick={onSignInClick}>
                {signInLabel}
            </button>
            <button type="button" className="header__button header__button--primary" onClick={onPostJobClick}>
                {postJobLabel}
            </button>
        </div>
    );

    return (
        <header className="header">
            <div className="header__top">
                <div className="header__container header__top-inner">
                    <nav className="header__nav" aria-label="Main navigation">
                        {renderNavList('top')}
                    </nav>
                    <div className="header__contacts">
                        {renderPhone()}
                        {renderLanguage()}
                    </div>
                </div>
            </div>

            <div className="header__main">
                <div className="header__container header__main-inner">
                    <a href={logoHref} className="header__logo">
                        <BriefcaseIcon />
                        <span className="header__logo-text">{logoText}</span>
                    </a>

                    <form className="header__search" role="search" onSubmit={onSearchSubmit}>
                        <button type="button" className="header__select header__select--country" onClick={onCountryClick}>
                            <img src={country.flagSrc} alt="" className="header__flag" width="24" height="16" />
                            <span>{country.label}</span>
                            <ChevronIcon />
                        </button>
                        <span className="header__search-divider" aria-hidden="true" />
                        <label className="header__search-field">
                            <span className="visually-hidden">{searchPlaceholder}</span>
                            <SearchIcon />
                            <input
                                type="search"
                                name="search"
                                className="header__search-input"
                                placeholder={searchPlaceholder}
                                value={searchValue}
                                onChange={onSearchChange}
                            />
                        </label>
                    </form>

                    {renderActions('desktop')}

                    <button
                        type="button"
                        className={`header__burger${isMenuOpen ? ' header__burger--open' : ''}`}
                        aria-label={isMenuOpen ? menuCloseLabel : menuOpenLabel}
                        aria-expanded={isMenuOpen}
                        aria-controls={MENU_ID}
                        onClick={onMenuToggle}
                    >
                        <span className="header__burger-line" />
                        <span className="header__burger-line" />
                        <span className="header__burger-line" />
                    </button>
                </div>
            </div>

            <div
                id={MENU_ID}
                className={`header__mobile-menu${isMenuOpen ? ' header__mobile-menu--open' : ''}`}
                hidden={!isMenuOpen}
            >
                <nav className="header__container header__mobile-nav" aria-label="Mobile navigation">
                    {renderNavList('mobile')}
                    {renderActions('mobile')}
                    <div className="header__contacts header__contacts--mobile">
                        {renderPhone()}
                        {renderLanguage()}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;