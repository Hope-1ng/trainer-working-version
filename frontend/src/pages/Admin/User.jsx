// UserManagement.jsx
import React, { useState } from "react";
import "../style/user.css";
import Sidebar from "./Sidebar";
import axiosInstance from "../../axiosinterceptor";
import { useEffect } from "react";
import AddCapacityDialog from "./TrainerForm";

const UserManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCapacityDialog, setShowCapacityDialog] = useState(false);
  const [trainerUserId, setTrainerUserId] = useState(null);

  const [users, setUsers] = useState([]);

  const fetchuser = () => {
    axiosInstance
      .get("/admin/users")
      .then((res) => {
        console.log(res.data.data);

        setUsers(res.data.data);
      })
      .catch((err) => {
        console.error(err, "error fetching user data");
      });
  };

  useEffect(() => {
    fetchuser();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
    skil: "",
    region: "",
    ou: "",
    status: "active",
    password: "",
  });

  const ous = ["Corperate OU", "GOVT OU", "Retail OU", "Educational OU"];

  const skils = [
    "java",
    "js",
    "frontend-react",
    "backend-js",
    "python",
    "Go",
    "web-dev",
  ];

  const roles = [
    "Admin",
    "CEO",
    "KO Head",
    "KO Lead",
    "OU Coordinator",
    "OU Head",
    "Trainer",
  ];
  const regions = ["North", "South", "Central"];

  const handleOpenModal = (mode, user = null) => {
    setModalMode(mode);
    if (mode === "edit" && user) {
      setSelectedUser(user);
      setFormData({
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        region: user.region,
        ou: user.ou,
        skill: user.skill,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        mobile: "",
        role: "",
        region: "",
        password: "",
        confirmPassword: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.endsWith("@ictak.in")) {
      alert("Email must be in ICTAK format (@ictak.in)");
      return;
    }

    if (formData.mobile.length !== 10) {
      alert("Mobile number must be 10 digits");
      return;
    }

    if (modalMode === "add") {
      if (formData.password.length < 8) {
        alert("Password must be at least 8 characters");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      axiosInstance
        .post("/admin/add", formData)
        .then((res) => {
          console.log("new user", res.data.userId);
          console.log("new user", res.data.newUser_role);
          fetchuser();

          if (res.data.newUser_role === "Trainer") {
            setTrainerUserId(res.data.userId); // backend must return userId
            setShowCapacityDialog(true);
          } else {
            alert("User created successfully!");
          }
        })
        .catch((err) => {
          console.error("error adiing new user", err);
        });

      // const newUser = {
      //   id: users.length + 1,
      //   ...formData,
      //   status: "Active",
      //   lastLogin: "Never",
      // };
      // setUsers([...users, newUser]);
      alert("User created successfully!");
    } else {
      // setUsers(
      //   users.map((user) =>
      //     user.id === selectedUser.id ? { ...user, ...formData } : user

      //   )

      // );

      console.log(selectedUser);

      axiosInstance
        .put("/admin/edit", formData)
        .then((res) => {
          fetchuser();
          alert("User updated successfully!");
        })
        .catch((err) => {
          console.error("Update failed", err);
        });
    }

    handleCloseModal();
  };

  const handleCapacitySave = async (capacityData) => {
    try {
      await axiosInstance.post("/admin/trainer", capacityData);

      alert("Trainer capacity saved successfully");
      setShowCapacityDialog(false);
    } catch (err) {
      console.error("Failed to save capacity", err);
    }
  };

  const handleToggleStatus = async (userId) => {
    console.log(userId);

    const updatedUsers = users.map((user) =>
      user._id === userId
        ? {
            ...user,
            status: user.status === "Active" ? "Inactive" : "Active",
          }
        : user
    );

    const updatedUser = updatedUsers.find((u) => u._id === userId);

    try {
      setUsers(updatedUsers);

      await axiosInstance
        .put("/admin/status", {
          userId,
          status: updatedUser.status,
        })
        .then((res) => {
          console.log(res.data.message);
        });
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleResetPassword = (user) => {
    if (window.confirm(`Reset password for ${user.name}?`)) {
      alert("Password reset link sent to user email");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div>
      <aside className="sidebar">
        <Sidebar />
      </aside>

      <div className="user-management">
        <div className="page-header">
          <div>
            <h1>User Management</h1>
            <p className="page-subtitle">
              Manage users, roles, and permissions
            </p>
          </div>
          <button
            className="btn-primary"
            onClick={() => handleOpenModal("add")}
          >
            <span className="btn-icon">➕</span>
            Add New User
          </button>
        </div>

        <div className="stats-row">
          <div className="stat-box">
            <div className="stat-label">Total Users</div>
            <div className="stat-value">{users.length}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Active Users</div>
            <div className="stat-value green">
              {users.filter((u) => u.status === "active").length}
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Inactive Users</div>
            <div className="stat-value red">
              {users.filter((u) => u.status === "Inactive").length}
            </div>
          </div>
          {/* <div className="stat-box">
            <div className="stat-label">New This Month</div>
            <div className="stat-value blue">12</div>
          </div> */}
        </div>

        <div className="filters-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="table-card">
          <div className="table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Role</th>
                  <th>Region</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">{user.name.charAt(0)}</div>
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>
                      <span className="role-badge primary">{user.role}</span>
                    </td>

                    <td>{user.region}</td>
                    <td>
                      <span
                        className={`status-badge ${user.status.toLowerCase()}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="last-login">{user.lastLogin}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-action edit"
                          onClick={() => handleOpenModal("edit", user)}
                          title="Edit User"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-action toggle"
                          onClick={() => handleToggleStatus(user._id)}
                          title={
                            user.status === "Active" ? "Deactivate" : "Activate"
                          }
                        >
                          {user.status === "Active" ? "🔒" : "🔓"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AddCapacityDialog
          open={showCapacityDialog}
          onClose={() => setShowCapacityDialog(false)}
          userId={trainerUserId}
          onSubmit={handleCapacitySave}
        />

        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{modalMode === "add" ? "Add New User" : "Edit User"}</h2>
                <button className="close-btn" onClick={handleCloseModal}>
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="user@ictak.in"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Mobile *</label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="10 digits"
                      maxLength="10"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label> Role *</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.role === "Trainer" && (
                    <div className="form-group">
                      <label>Skills</label>
                      <select
                        name="skill"
                        value={formData.skill}
                        onChange={handleInputChange}
                      >
                        <option value="">None</option>
                        {skils.map((skil) => (
                          <option key={skil} value={skil}>
                            {skil}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="form-group">
                    <label>OU</label>
                    <select
                      name="ou"
                      value={formData.ou}
                      onChange={handleInputChange}
                    >
                      <option value="">None</option>
                      {ous.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Region *</label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Region</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>

                  {modalMode === "add" && (
                    <>
                      <div className="form-group">
                        <label>Password *</label>
                        <input
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Min 8 characters"
                          required
                        />
                        <small className="form-hint">
                          Must contain numbers and special characters
                        </small>
                      </div>

                      <div className="form-group">
                        <label>Confirm Password *</label>
                        <input
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    {modalMode === "add" ? "Create User" : "Update User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
