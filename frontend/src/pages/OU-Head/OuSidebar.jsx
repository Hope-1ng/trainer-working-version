import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";
import "../style/sidebar.css";

const OuSidebar = () => {
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
        <h2>OU Head</h2>
      </div>

      <nav className="nav-menu">
        <NavLink to="/ouhead-dashboard" className={linkClass}>
          <FaTachometerAlt className="icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/ouhead/requests" className={linkClass}>
          <FaBook className="icon" />
          <span>Training Requests</span>
        </NavLink>

        <NavLink to="/ouhead/trainer" className={linkClass}>
          <FaChalkboardTeacher className="icon" />
          <span>Trainers</span>
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

export default OuSidebar;
