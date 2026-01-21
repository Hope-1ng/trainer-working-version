// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import "../style/admindash.css";
import Sidebar from "./Sidebar";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../axiosinterceptor";

const AdminDashboard = () => {
  const [activeNav, setActiveNav] = useState("dashboard");

  const [users, setUsers] = useState([]);
  const [req, setReq] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const fetchuser = () => {
    axiosInstance
      .get("/admin/users")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.error("errror fetching users data", err);
      });
  };

  const fetchreq = () => {
    axiosInstance
      .get("/ou/reqs")
      .then((res) => {
        setReq(res.data.data);
      })
      .catch((err) => {
        console.error("error fetching req data", err);
      });
  };

  const fetchtrainers = () => {
    axiosInstance
      .get("/admin/trainers")
      .then((res) => {
        setTrainers(res.data.trainers);
      })
      .catch((err) => {
        console.error("error fetching trainers data", err);
      });
  };

  useEffect(() => {
    fetchuser();
    fetchreq();
    fetchtrainers();
  }, []);

  console.log("trainerss", trainers);

  console.log(req);

  const stats = [
    {
      id: 1,
      title: "Total Users",
      value: users.length,
      change: "+12%",
      icon: "👥",
      color: "blue",
    },
    {
      id: 2,
      title: "Active Training Requests",
      value: req.length,
      change: "+8%",
      icon: "📚",
      color: "green",
    },
    {
      id: 3,
      title: "Total Trainers",
      value: trainers.length,
      change: "+5%",
      icon: "👨‍🏫",
      color: "purple",
    },
  ];

  const trainerLoad = [
    { name: "John Doe", hours: 85, capacity: 120, percentage: 71 },
    { name: "Jane Smith", hours: 102, capacity: 120, percentage: 85 },
    { name: "Mike Johnson", hours: 45, capacity: 120, percentage: 38 },
    { name: "Sarah Williams", hours: 118, capacity: 120, percentage: 98 },
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <h1>Admin Dashboard</h1>
            <p className="subtitle">Welcome back, Administrator</p>
          </div>
          <div className="header-right">
            <div className="notification-icon">
              <span>🔔</span>
              <span className="badge">5</span>
            </div>
            <div className="user-profile">
              <span>Admin User</span>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className={`stat-card ${stat.color}`}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3>{stat.title}</h3>
                <div className="stat-value">{stat.value}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Charts and Tables */}
        <section className="dashboard-grid">
          {/* Recent Training Requests */}
          <div className="card">
            <div className="card-header">
              <h2>Recent Training Requests</h2>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>OU</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {req.map((req) => (
                    <tr key={req._id}>
                      <td>{req.trainingTitle}</td>
                      <td>{req.ou}</td>
                      <td>
                        <span
                          className={`status-badge ${req.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td>
                        {new Date(req.expectedStartDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Trainer Load Chart */}
          <div className="card">
            <div className="card-header">
              <h2>Trainer Load Overview</h2>
              <button className="btn-link">Details</button>
            </div>
            <div className="trainer-load-container">
              {trainers.map((trainer, idx) => {
                const loadPercentage = Math.round(
                  (trainer.currentLoad / trainer.maxLoad) * 100,
                );

                return (
                  <div key={idx} className="trainer-item">
                    <div className="trainer-info">
                      <span className="trainer-name">
                        {trainer.userId.name}
                      </span>
                      <span className="trainer-hours">
                        {trainer.currentLoad}/{trainer.maxLoad} Load
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className={`progress-fill ${
                          loadPercentage > 75
                            ? "high"
                            : loadPercentage > 50
                              ? "medium"
                              : "low"
                        }`}
                        style={{ width: `${trainer.percentage}%` }}
                      ></div>
                    </div>
                    <span className="percentage">{loadPercentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card quick-actions">
            <div className="card-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="actions-grid">
              <NavLink to="/admin/users" className="action-btn">
                <span className="action-icon">👨‍🏫</span>
                <span>Add User</span>
              </NavLink>

              <NavLink to="/admin/trainers" className="action-btn">
                <span className="action-icon">👨‍🏫</span>
                <span>Add Trainer</span>
              </NavLink>
            </div>
          </div>

          {/* System Alerts */}
          {/* <div className="card alerts">
            <div className="card-header">
              <h2>System Alerts</h2>
            </div>
            <div className="alerts-container">
              <div className="alert alert-warning">
                <span className="alert-icon">⚠️</span>
                <div className="alert-content">
                  <h4>High Trainer Load</h4>
                  <p>Jane Smith is at 98% capacity this month</p>
                </div>
              </div>
              <div className="alert alert-info">
                <span className="alert-icon">ℹ️</span>
                <div className="alert-content">
                  <h4>Pending Approvals</h4>
                  <p>15 training requests awaiting review</p>
                </div>
              </div>
              <div className="alert alert-success">
                <span className="alert-icon">✅</span>
                <div className="alert-content">
                  <h4>Allocation Complete</h4>
                  <p>All requests for next week allocated</p>
                </div>
              </div>
            </div>
          </div> */}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
