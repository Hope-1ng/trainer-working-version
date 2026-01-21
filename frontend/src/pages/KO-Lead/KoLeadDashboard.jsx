import React from "react";
import KoLeadSidebar from "./KoLeadSidebar";
import "./koLeadDashboard.css";

const KoLeadDashboard = () => {
  return (
    <div className="kolead-dashboard">
      <KoLeadSidebar />

      <main className="kolead-main">
        <h1>KO Lead Dashboard</h1>

        <div className="kolead-stats">
          <div className="kolead-card">📄 Assigned Requests: 14</div>
          <div className="kolead-card">👨‍🏫 Trainers Under You: 6</div>
          <div className="kolead-card">📅 Upcoming Sessions: 5</div>
        </div>
      </main>
    </div>
  );
};

export default KoLeadDashboard;
