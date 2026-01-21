import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBookOpen,
  FaUsers,
  FaCalendarAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import "../style/sidebar.css";

const KoLeadSidebar = () => {
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
        <h2>KO Lead</h2>
      </div>

      <nav className="nav-menu">
        <NavLink to="/kolead-dashboard" className={linkClass}>
          <FaTachometerAlt className="icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/kolead/assigned-requests" className={linkClass}>
          <FaBookOpen className="icon" />
          <span>Assigned Requests</span>
        </NavLink>

        <NavLink to="/kolead/trainers" className={linkClass}>
          <FaUsers className="icon" />
          <span>Trainers</span>
        </NavLink>

        <NavLink to="/kolead/schedule" className={linkClass}>
          <FaCalendarAlt className="icon" />
          <span>Schedule</span>
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

export default KoLeadSidebar;
