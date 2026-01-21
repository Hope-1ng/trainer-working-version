import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaClipboardList,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import "../style/sidebar.css";

const TrainerSidebar = () => {
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
        <h2>Trainer</h2>
      </div>

      <nav className="nav-menu">
        <NavLink to="/trainer-dashboard" className={linkClass}>
          <FaTachometerAlt className="icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/trainer/schedule" className={linkClass}>
          <FaCalendarAlt className="icon" />
          <span>My Schedule</span>
        </NavLink>

        {/* <NavLink to="/trainer/history" className={linkClass}>
          <FaClipboardList className="icon" />
          <span>Training History</span>
        </NavLink>

        <NavLink to="/trainer/profile" className={linkClass}>
          <FaUser className="icon" />
          <span>My Profile</span>
        </NavLink> */}
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

export default TrainerSidebar;
