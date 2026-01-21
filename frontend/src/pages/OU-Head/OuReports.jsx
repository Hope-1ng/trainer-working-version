import React from "react";
import OuSidebar from "./OuSidebar";
import "./ouDashboard.css";

const OuReports = () => {
  return (
    <div className="ou-dashboard">
      <OuSidebar />

      <main className="ou-main">
        <div className="ou-header">
          <h1>Reports</h1>
          <p className="ou-subtitle">OU performance reports</p>
        </div>

        <div className="report-actions">
          <button className="btn-secondary">Download PDF</button>
          <button className="btn-secondary">Download Excel</button>
        </div>
      </main>
    </div>
  );
};

export default OuReports;
