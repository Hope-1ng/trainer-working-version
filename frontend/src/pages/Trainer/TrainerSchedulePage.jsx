import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import TrainerSidebar from "./TrainerSidebar";
import "./schedule.css";
import axiosInstance from "../../axiosinterceptor";

const TrainerSchedulePage = () => {
  const [assignedReq, setAssignedReq] = useState([]);

  useEffect(() => {
    fetchAssignedReq();
  }, []);

  const fetchAssignedReq = () => {
    axiosInstance
      .get("/trainer/req")
      .then((res) => {
        setAssignedReq(res.data.data);
      })
      .catch((err) => {
        console.error("error fetching training request for the trainer", err);
      });
  };

  const COLORS = [
    "#1abc9c",
    "#3498db",
    "#9b59b6",
    "#e67e22",
    "#e74c3c",
    "#2ecc71",
    "#f1c40f",
  ];

  function getRandomNiceColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  const endDate = (req) => {
    const startDate = new Date(req.expectedStartDate);
    const durationInDays = req.durationInDays || 0;

    const calculatedEndDate = new Date(startDate);

    return calculatedEndDate.setDate(
      calculatedEndDate.getDate() + durationInDays,
    );
  };

  console.log(assignedReq);

  const events = assignedReq.map((req) => ({
    title: req.trainingTitle,
    description: req.place,
    start: new Date(req.expectedStartDate),
    end: new Date(endDate(req)),
    backgroundColor: getRandomNiceColor(),
    extendedProps: {
      description: req.place,
    },
  }));

  console.log(events);

  return (
    <div>
      <aside className="sidebar">
        <TrainerSidebar />
      </aside>
      <div className="user-management">
        <div className="page-header">
          <div>
            <h1>Training Scheduling</h1>
            <p className="page-subtitle">Manage Training schedules</p>
          </div>
        </div>
      </div>

      <main className=" calbody">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          height="auto"
          eventContent={(eventInfo) => (
            <div>
              <b>{eventInfo.event.title}</b>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>
                {eventInfo.event.extendedProps.description}
              </div>
            </div>
          )}
        />
      </main>
    </div>
  );
};

export default TrainerSchedulePage;
