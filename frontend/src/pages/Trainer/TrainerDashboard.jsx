import React, { useEffect, useState } from "react";
import TrainerSidebar from "./TrainerSidebar";
import "./trainerDashboard.css";
import axiosInstance from "../../axiosinterceptor";

const TrainerDashboard = () => {
  const [requestes, setRequests] = useState([]);

  useEffect(() => {
    fetchreq();
  }, []);

  const fetchreq = () => {
    axiosInstance
      .get("/trainer/req")
      .then((res) => {
        setRequests(res.data.data);
      })
      .catch((err) => {
        console.error("error fetching training request for the trainer", err);
      });
  };

  const handleComplateTraining = async (req) => {
    try {
      const reqId = req._id;
      const assignedTrainer = req.assignedTrainer;
      const res = await axiosInstance.put("/trainer/finish", {
        reqId,
        assignedTrainer,
      });

      console.log(res.data.data);

      fetchreq();
    } catch (error) {
      console.error("error updating the status", error);
    }
  };

  return (
    <div>
      <aside className="sidebar">
        <TrainerSidebar />
      </aside>

      <div className="user-management">
        <div className="page-header">
          <div>
            <h1>Trainer Dashboard</h1>
            <p className="page-subtitle">Manage Training Requests</p>
          </div>
        </div>
        <div className="stats-row">
          <div className="stat-box">
            <div className="stat-label">Total TR</div>
            <div className="stat-value">{requestes.length}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Approved Requests</div>
            <div className="stat-value green">
              {requestes.filter((u) => u.status === "Approved").length}
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Rerejected TR</div>
            <div className="stat-value red">
              {requestes.filter((u) => u.status === "Rejected").length}
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Completed TR</div>
            <div className="stat-value green">
              {requestes.filter((u) => u.status === "Completed").length}
            </div>
          </div>
        </div>

        <div>
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
                    <th>place</th>
                    <th>contact No</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requestes.map((req) => (
                    <tr key={req._id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">
                            {req.skill.charAt(0)}
                          </div>
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
                          className={`status-badge${req.status.toLowerCase()}`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td>
                        <span>{req.place}</span>
                      </td>

                      <td>{req.contact}</td>

                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn-action edit"
                            disabled={req.status === "Completed"}
                            onClick={() => handleComplateTraining(req)}
                            title="Edit TR"
                          >
                            ✅
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
