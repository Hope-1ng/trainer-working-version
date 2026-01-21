import React, { useEffect, useEffectEvent, useState } from "react";
import OuSidebar from "../OU-Head/OuSidebar";
import "../OU-Head/OuDashboard.css";
import axiosInstance from "../../axiosinterceptor";

const OuHeadDashboard = () => {
  const [reqs, setReqs] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const fetchRequestes = () => {
    axiosInstance
      .get("/ou/reqs")
      .then((res) => {
        setReqs(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchtrainers = () => {
    axiosInstance
      .get("/admin/trainers")
      .then((res) => {
        
        setTrainers(res.data.trainers);
      })
      .catch((err) => {
        console.error("error featching traniers data", err);
      });
  };

  useEffect(() => {
    fetchRequestes();
    fetchtrainers();
  }, []);

  const approvedRequests = reqs.filter((req) => req.status === "Approved");

  return (
    <div className="ou-dashboard">
      <OuSidebar />

      <main className="ou-main">
        <div className="ou-header">
          <h1>OU Head Dashboard</h1>
          <p className="ou-subtitle">Overview of your Operating Unit</p>
        </div>

        <div className="ou-stats">
          <div className="ou-stat-card blue">
            <div className="ou-stat-icon">📚</div>
            <div>
              <div className="ou-stat-title">Total Requests</div>
              <div className="ou-stat-value">{reqs.length}</div>
            </div>
          </div>

          <div className="ou-stat-card green">
            <div className="ou-stat-icon">✅</div>
            <div>
              <div className="ou-stat-title">Approved</div>
              <div className="ou-stat-value">{approvedRequests.length}</div>
            </div>
          </div>

          <div className="ou-stat-card orange">
            <div className="ou-stat-icon">👨‍🏫</div>
            <div>
              <div className="ou-stat-title">Trainers</div>
              <div className="ou-stat-value">{trainers.length}</div>
            </div>
          </div>

          <div className="ou-stat-card purple">
            <div className="ou-stat-icon">📅</div>
            <div>
              <div className="ou-stat-title">Upcoming Sessions</div>
              <div className="ou-stat-value">6</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OuHeadDashboard;
