import React from "react";
import CeoSidebar from "./CeoSidebar";
import "./ceoDashboard.css";

const CeoDashboard = () => {
  return (
    <div className="ceo-dashboard">
      <CeoSidebar />

      <main className="ceo-main">
        <div className="ceo-header">
          <h1>CEO Dashboard</h1>
          <p className="ceo-subtitle">Organization level overview</p>
        </div>

        <div className="ceo-stats">
          <div className="ceo-card blue">
            <span>📊</span>
            <div>
              <p>Total Trainings</p>
              <h2>124</h2>
            </div>
          </div>

          <div className="ceo-card green">
            <span>👨‍🏫</span>
            <div>
              <p>Total Trainers</p>
              <h2>58</h2>
            </div>
          </div>

          <div className="ceo-card orange">
            <span>🌍</span>
            <div>
              <p>Active OUs</p>
              <h2>12</h2>
            </div>
          </div>

          <div className="ceo-card purple">
            <span>📈</span>
            <div>
              <p>Utilization %</p>
              <h2>82%</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CeoDashboard;
