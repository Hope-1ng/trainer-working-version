import React, { useState, useMemo, useEffect } from "react";
import "../style/TrainerDatabase.css";
import axiosInstance from "../../axiosinterceptor";
import Sidebar from "./Sidebar";

export default function TrainerDatabase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const [trainers,setTrainers]=useState([])

  useEffect(() => {
    axiosInstance
      .get("/admin/trainers")
      .then((res) => {
        console.log(res.data.trainers);
        setTrainers(res.data.trainers)
      })
      .catch((err) => {
        console.error("error featching traniers data", err);
      });
  }, []);

  

  const filteredTrainers = useMemo(() => {
    return trainers
      .filter((t) => {
        const name = t.userId.name ?? "";
        const skills = t.userId.skill ?? [];
        const region = t.userId.region ?? "";

        return (
          name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (skillFilter === "all" || skills.includes(skillFilter)) &&
          (regionFilter === "all" || region === regionFilter)
        );
      })
      
  }, [trainers, searchQuery, skillFilter, regionFilter, ]);

  return (
    <div className="trainer-page">

      <Sidebar/>
      <h2 className="page-title">Trainer Database</h2>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search trainers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
        >
          <option value="all">All Skills</option>
          <option value="React">React</option>
          <option value="Node">Node</option>
          <option value="python">python</option>
        </select>

        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          <option value="all">All Regions</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">cintral</option>
        </select>

      </div>

      {/* Cards */}
      <div className="trainer-grid">
        {filteredTrainers.map((t) => (
          <div className="trainer-card" key={t._id || t.id}>
            <div className="card-header">
              <div className="avatar">
                {(t.userId.name || "")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h4>{t.userId.name}</h4>
                <span className={`status ${t.userId.status}`}>
                  {t.userId.status.replace("_", " ")}
                </span>
              </div>
            </div>

            <div className="card-body">
              <p>
                <strong>Region:</strong> {t.userId.region}
              </p>
              <p>
                <strong>Experience:</strong> {t.experience} years
              </p>
              <p>
                <strong>Rating:</strong> ⭐ {t.rating}
              </p>

              <div className="load-bar">
                <div
                  className="load-fill"
                  style={{
                    width: `${(t.currentLoad / t.maxLoad) * 100}%`,
                  }}
                />
              </div>
              <small>
                Load: {t.currentLoad}/{t.maxLoad}
              </small>
            </div>

            {/* <div className="card-actions">
              <button className="btn secondary">View</button>
              <button className="btn primary">Calendar</button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
