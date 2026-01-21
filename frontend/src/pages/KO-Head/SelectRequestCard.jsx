import React, { useEffect, useState } from "react";
import "../style/SelectRequestCard.css";
import { selectClasses } from "@mui/material";

const SelectRequestCard = ({ requests, selectedId, onChange }) => {
  const selectedRequest = requests.find((r) => r._id === selectedId);

  const [endDate,setEndDate]=useState(null)

   useEffect(() => {
    if (selectedRequest) {
      const startDate = new Date(selectedRequest.expectedStartDate);
      const durationInDays = selectedRequest.durationInDays || 0;

      const calculatedEndDate = new Date(startDate);
      calculatedEndDate.setDate(calculatedEndDate.getDate() + durationInDays);

      setEndDate(calculatedEndDate);
    } else {
      setEndDate(null);
    }
  }, [selectedRequest]);

 

  return (
    <div className="select-request-card">
      <div className="card-header">
        <span className="card-icon">⚡</span>
        <span className="card-title">Select Request</span>
      </div>

      <select
        className="request-select"
        value={selectedId}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select TR</option>
        {requests.map((req) => (
          <option key={req._id} value={req._id}>
            {req.trainingTitle}-{req.place}
          </option>
        ))}
      </select>

      {}

      {selectedRequest && (
        <div className="request-details">
          <div className="request-name">{selectedRequest.trainingTitle}</div>
          <div className="request-dates">
            {new Date(selectedRequest.expectedStartDate).toLocaleDateString()}-{new Date(endDate).toLocaleDateString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectRequestCard;
