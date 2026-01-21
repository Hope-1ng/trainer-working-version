import React from "react";
import OuSidebar from "./OuSidebar";
import "./ouDashboard.css";

const OuScheduling = () => {
  return (
    <div className="ou-dashboard">
      <OuSidebar />

      <main className="ou-main">
        <div className="ou-header">
          <h1>Scheduling</h1>
          <p className="ou-subtitle">Upcoming training schedules</p>
        </div>

        <div className="calendar-placeholder">
          📅 FullCalendar integration will be added here
        </div>
      </main>
    </div>
  );
};

export default OuScheduling;
