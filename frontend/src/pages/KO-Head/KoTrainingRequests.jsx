import React, { useState } from "react";
import "../style/user.css";
import Kosidebar from "./KoSidebar";
import axiosInstance from "../../axiosinterceptor";
import { useEffect } from "react";

const KoTrainingRequests = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedreq, setSelectedreq] = useState(null);
  const [showCapacityDialog, setShowCapacityDialog] = useState(false);
  const [trainerUserId, setTrainerUserId] = useState(null);

  const [users, setUsers] = useState([]);
  const [requestes, setRequestes] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchRequestes();
  }, [refresh]);

  console.log(requestes);

  const [formData, setFormData] = useState({
    trainingTitle: "",
    place: "",
    contact: "",
    region: "",
    ou: "",
    preferredMode: "",
    expectedStartDate: "",
    totalHrs: "",
    durationInDays: "",
    expectedParticipants: "",
  });

  const ous = ["Corperate OU", "GOVT OU", "Retail OU", "Educational OU"];

  const modes = ["Online", "Classroom", "Hybrid"];

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

  const handleOpenModal = (mode, req = null) => {
    setModalMode(mode);
    if (mode === "edit" && req) {
      setSelectedreq(req);
      console.log("userrrr", req);

      setFormData({
        id: req._id,
        trainingTitle: req.trainingTitle,
        place: req.place,
        preferredMode: req.preferredMode,
        expectedStartDate: req.expectedStartDate,
        totalHrs: req.totalHrs,
        durationInDays: req.durationInDays,
        expectedParticipants: req.expectedParticipants,
        contact: req.contact,
        region: req.region,
        ou: req.ou,
        skill: req.skill,
      });
    } else {
      setFormData({
        trainingTitle: "",
        place: "",
        contact: "",
        skill: "",
        region: "",
        ou: "",
        preferredMode: "",
        expectedStartDate: "",
        totalHrs: "",
        durationInDays: "",
        expectedParticipants: "",
      });
    }
    setShowModal(true);
  };

  const fetchRequestes = () => {
    axiosInstance
      .get("/ou/reqs")
      .then((res) => {
        setRequestes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedreq(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.contact.length !== 10) {
      alert("Mobile number must be 10 digits");
      return;
    }

    if (modalMode === "add") {
      axiosInstance
        .post("/ou/add_req", formData)
        .then((res) => {
          console.log(res.message);
        })
        .catch((err) => {
          console.error("error adding TR", err);
        });

      handleCloseModal();
    } else {
      axiosInstance
        .put("/ou/update_req", formData)
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((err) => {
          console.error("error to update", err);
        });
    }
    handleCloseModal();
  };

  const handleapprove = async (req, status) => {
    try {
      await axiosInstance.put("/ko/approve", { req, status });

      setRefresh((prev) => !prev);

    } catch (error) {
      console.error(error);
    }
  };

  const handlerejact = async (req, status) => {
    try {
      await axiosInstance.put("/ko/approve", { req, status });

      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
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
        <Kosidebar />
      </aside>

      <div className="user-management">
        <div className="page-header">
          <div>
            <h1>TR Management</h1>
            <p className="page-subtitle">Manage Training Requests</p>
          </div>
          {/* <button
            className="btn-primary"
            onClick={() => handleOpenModal("add")}
          >
            <span className="btn-icon">➕</span>
            New TR
          </button> */}
        </div>

        <div className="stats-row">
          <div className="stat-box">
            <div className="stat-label">Total TR</div>
            <div className="stat-value">{requestes.length}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Pending Requests</div>
            <div className="stat-value green">
              {requestes.filter((u) => u.status === "Pending").length}
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Rerejected TR</div>
            <div className="stat-value red">
              {requestes.filter((u) => u.status === "Rejected").length}
            </div>
          </div>
            <div className="stat-box">
            <div className="stat-label">Approved TR</div>
            <div className="stat-value green">
              {requestes.filter((u) => u.status === "Approved").length}
            </div>
          </div>
          {/* <div className="stat-box">
            <div className="stat-label">New This Month</div>
            <div className="stat-value blue">12</div>
          </div> */}
        </div>
        {/* 
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
        </div> */}

        <div className="table-card">
          <div className="table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>TR Title</th>
                  <th>Region</th>
                  <th>Ou Type</th>
                  <th>Start Date</th>
                  <th>Mode</th>
                  <th>Status</th>
                  <th>contact No</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requestes.map((req) => (
                  <tr key={req._id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">{req.skill.charAt(0)}</div>
                        <span>{req.trainingTitle}</span>
                      </div>
                    </td>

                    <td>
                      <span className="role-badge primary">{req.region}</span>
                    </td>

                    <td>{req.ou}</td>
                    <td>
                      {new Date(req.expectedStartDate).toLocaleDateString()}
                    </td>
                    <td>{req.preferredMode}</td>

                    <td>
                      <span
                        className={`status-badge ${req.status.toLowerCase()}`}
                      >
                        {req.status}
                      </span>
                    </td>

                    <td>{req.contact}</td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-action edit"
                          onClick={() => handleOpenModal("edit", req)}
                          title="Edit TR"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-action edit"
                          title="Approve TR"
                          onClick={() => {
                            handleapprove(req, "Approved");
                          }}
                        >
                          ✅
                        </button>
                        <button
                          className="btn-action edit"
                          title="Rejact TR"
                          onClick={() => {
                            handlerejact(req, "Rejected");
                          }}
                        >
                          ❌
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{modalMode === "add" ? "Add New TR" : "Edit TR"}</h2>
                <button className="close-btn" onClick={handleCloseModal}>
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label> Training Title *</label>
                    <input
                      value={formData.trainingTitle}
                      type="text"
                      name="trainingTitle"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>place *</label>
                    <input
                      value={formData.place}
                      type="text"
                      name="place"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>expectedStartDate*</label>
                    <input
                      value={
                        formData.expectedStartDate
                          ? new Date(formData.expectedStartDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      type="date"
                      name="expectedStartDate"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>durationInDays*</label>
                    <input
                      value={formData.durationInDays}
                      type="text"
                      name="durationInDays"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Total Hrs*</label>
                    <input
                      value={formData.totalHrs}
                      type="text"
                      name="totalHrs"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>expectedParticipants*</label>
                    <input
                      value={formData.expectedParticipants}
                      type="text"
                      name="expectedParticipants"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Contact number *</label>
                    <input
                      value={formData.contact}
                      type="text"
                      name="contact"
                      onChange={handleInputChange}
                      placeholder="10 digits"
                      maxLength="10"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>preferred Mode*</label>
                    <select
                      name="preferredMode"
                      value={formData.preferredMode}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Mode</option>
                      {modes.map((mode) => (
                        <option key={mode} value={mode}>
                          {mode}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Skill</label>
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
                    {modalMode === "add" ? "Create TR" : "Update TR"}
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

export default KoTrainingRequests;
