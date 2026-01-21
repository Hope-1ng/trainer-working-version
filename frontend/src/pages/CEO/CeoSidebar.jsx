import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChartBar,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import "../style/sidebar.css";

const CeoSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    isActive ? "nav-item active" : "nav-item";

  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>CEO Panel</h2>
      </div>

      <nav className="nav-menu">
        <NavLink to="/ceo-dashboard" className={linkClass}>
          <FaTachometerAlt className="icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/ceo/reports" className={linkClass}>
          <FaChartBar className="icon" />
          <span>Reports</span>
        </NavLink>

        <NavLink to="/ceo/audit-logs" className={linkClass}>
          <FaClipboardList className="icon" />
          <span>Audit Logs</span>
        </NavLink>
      </nav>

      <div className="logout-section">
        <button className="logout-btn" onClick={logout}>
          <FaSignOutAlt className="icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default CeoSidebar;
