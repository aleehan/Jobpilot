import "./Footer.css";

function Footer({
  logoText = "Jobpilot",
  logoHref = "/",
  phoneLabel = "Call now:",
  phone = "",
  address = "",
  columns = [],
  copyright = "",
  socials = [],
}) {
  return (
    <footer className="footer">
      <div className="container footer__main">
        <div className="footer__brand">
          <a href={logoHref} className="footer__logo">
            <svg
              className="footer__logo-icon"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="5"
                y="11"
                width="30"
                height="22"
                rx="3"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <path
                d="M14 11V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <path d="M5 19h30" stroke="currentColor" strokeWidth="2.5" />
              <path
                d="M20 17v4"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="footer__logo-text">{logoText}</span>
          </a>

          <address className="footer__contacts">
            <p className="footer__phone">
              {phoneLabel}{" "}
              <a
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                className="footer__phone-link"
              >
                {phone}
              </a>
            </p>
            <p className="footer__address">{address}</p>
          </address>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          {columns.map((column) => (
            <div key={column.title} className="footer__column">
              <h2 className="footer__column-title">{column.title}</h2>
              <ul className="footer__links">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`footer__link`}
                      aria-current={link.isActive ? "page" : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">{copyright}</p>

          <ul className="footer__socials">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="footer__social-link"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={social.iconSrc} alt="" width="20" height="20" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
