import React, { useState } from "react";
import "../style/user.css";
import Kosidebar from "./KoSidebar";
import axiosInstance from "../../axiosinterceptor";
import { useEffect } from "react";
import SelectRequestCard from "./SelectRequestCard";

const KoTrainerAllocation = () => {
  const [requestes, setRequestes] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState("");
  const [sortedTrainers, setSortedTrainers] = useState([]);

  useEffect(() => {
    fetchRequestes();
  }, []);

  const selectedApprovedReq = requestes.filter(
    (r) => r._id === selectedRequestId,
  );

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

  const fetchtrainers = async () => {
    try {
      if (!selectedApprovedReq || selectedApprovedReq.length === 0) {
        console.error("Selected request not found");
        return;
      }

      const res = await axiosInstance.get("/ko/trainers", {
        params: {
          skill: selectedApprovedReq[0].skill,
          region: selectedApprovedReq[0].region,
        },
      });

      setSortedTrainers(res.data.trainersData);

      console.log(res.data.trainersData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!selectedRequestId || requestes.length === 0) return;

    fetchtrainers();
  }, [selectedRequestId, requestes]);

  const handleallocate = async (trainerId, selectedRequestId) => {
    try {
      if (!selectedRequestId) {
        alert("Please select a training request");
        return;
      }

      const res = await axiosInstance.post("/ko/allocate-trainer", {
        requestId: selectedRequestId,
        trainerId,
      });
      alert("Trainer allocated successfully");

      fetchRequestes();
      setSortedTrainers([]);
      setSelectedRequestId("");
    } catch (error) {
      console.error("Allocation failed:", error.response?.data || error);
      alert("Allocation failed");
    }
  };

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
        </div>
        <div className="allo">
          <SelectRequestCard
            requests={requestes.filter((r) => r.status === "Approved")}
            selectedId={selectedRequestId}
            onChange={setSelectedRequestId}
          />

          <div className="allocation-panel">
            <div className=" headbox">
              <h4 className="headp"> Trainer Allocation </h4>
            </div>
            {sortedTrainers.map((t) => (
              <div className="box1" key={t._id}>
                <div className="box2">
                  <div className="box3">
                    <p>Name:{t.userId.name}</p>
                    <p>Region:{t.userId.region}</p>
                    <p>Experience:{t.experience}</p>
                    <p>Rating:{t.rating}⭐</p>
                  </div>
                  <div className="box4">
                    <button
                      onClick={() => {
                        handleallocate(t._id, selectedRequestId);
                      }}
                    >
                      Allocate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KoTrainerAllocation;
