// Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBook,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaChartBar,
  FaCogs,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import "../style/sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login
    navigate("/");
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="logo">
        <h2>TMS Admin</h2>
      </div>

      {/* Navigation */}
      <nav className="nav-menu">
        <NavLink to="/admin-dashboard" className="nav-item">
          <FaTachometerAlt className="icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/users" className="nav-item">
          <FaUsers className="icon" />
          <span>User Management</span>
        </NavLink>

        <NavLink to="/admin/trainers" className="nav-item">
          <FaChalkboardTeacher className="icon" />
          <span>Trainers</span>
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="logout-section">
        <button type="button" className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
