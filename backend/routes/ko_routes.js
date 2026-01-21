const express = require("express");
const router = express.Router();
const request = require("../models/traning_req");
const varify = require("../middleware/verifyToken");
const trainers = require("../models/trainer");
const user = require("../models/User");

router.put("/approve", varify, async (req, res) => {
  try {
    const { status } = req.body;
    const trId = req.body.req._id;

    const updateData = {
      status,
      updatedAt: new Date(),
    };

    if (status === "Approved") {
      updateData.approvedBy = req.user.id;
      updateData.approvalDate = new Date();
      updateData.rejectionReason = null;
    }

    if (status === "Rejected") {
      updateData.rejectionReason = req.body.rejectionReason || "Not specified";
      updateData.approvedBy = null;
      updateData.approvalDate = null;
    }

    console.log(updateData);

    const updatedTR = await request.findByIdAndUpdate(trId, updateData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Training Request status updated",
      data: updatedTR,
    });
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/trainers", async (req, res) => {
  try {
    const { skill, region } = req.query;

    if (!skill) {
      return res.status(400).json({
        success: false,
        message: "Skill query parameter is required",
      });
    }

    const users = await user
      .find({
        skill,
        role: "Trainer",
        region,
      })
      .select("_id");

    const userIds = users.map((u) => u._id);
    const trainersData = await trainers
      .find({
        userId: { $in: userIds },
        availability: "available",
        $expr: { $lt: ["$currentLoad", "$maxLoad"] },
      })
      .populate("userId", "name email skill region");

    return res.status(200).json({
      success: true,
      trainersData,
    });
  } catch (error) {
    console.error("Trainer fetch failed:", error);
  }
});

router.post("/allocate-trainer", async (req, res) => {
  try {
    const { requestId, trainerId } = req.body;

    if (!requestId || !trainerId) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    const trainingRequest = await request.findById(requestId);
    if (!trainingRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (trainingRequest.status === "Trainer Assigned") {
      return res.status(400).json({ message: "Already allocated" });
    }

    const trainer = await trainers.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    if (trainer.currentLoad >= trainer.maxLoad) {
      return res.status(400).json({ message: "Trainer load exceeded" });
    }

    trainer.currentLoad += 1;
    await trainer.save();

    trainingRequest.assignedTrainer = trainer._id;
    trainingRequest.status = "Trainer Assigned";
    await trainingRequest.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Allocation error:", error);
    res.status(500).json({ message: "Allocation failed" });
  }
});

module.exports = router;
