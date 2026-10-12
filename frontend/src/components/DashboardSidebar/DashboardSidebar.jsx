import { NavLink } from "react-router-dom";
import "./DashboardSidebar.css";

function DashboardSidebar() {
  const links = [
    { to: "/dashboard", label: "Overview", end: true },
    { to: "/dashboard/jobs/new", label: "Post a Job", end: true },
    { to: "/dashboard/applications", label: "Applications", end: false },
  ];

  return (
    <nav className="dashboard-sidebar" aria-label="Employer dashboard">
      <p className="dashboard-sidebar__label">EMPLOYER DASHBOARD</p>
      <ul className="dashboard-sidebar__list">
        {links.map((link) => (
          <li className="dashboard-sidebar__item" key={link.to}>
            <NavLink
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `dashboard-sidebar__link${isActive ? " dashboard-sidebar__link--active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default DashboardSidebar;
