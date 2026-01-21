const express = require("express");
const router = express.Router();
const trRequest = require("../models/traning_req");
const varify = require("../middleware/verifyToken");
const trainers = require("../models/trainer");

router.get("/req", varify, async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "user needed" });
    }

    const trainer = await trainers.findOne({ userId });

    if (!trainer) {
      return res.status(400).json({ message: "rainer not found" });
    }

    const trainerId = trainer._id;

    const trRequestes = await trRequest.find({ assignedTrainer: trainerId });

    if (!trRequestes) {
      return res.status(400).json({ message: "training requestes not found " });
    }

    res.status(200).json({ message: "requestes found", data: trRequestes });
  } catch (error) {
    console.error("Trainer req error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.put("/finish", varify, async (req, res) => {
  try {
    const { reqId, assignedTrainer } = req.body;

    if (!reqId) {
      return res.status(400).json({ message: "reqId is required" });
    }

    const reqt = await trRequest.findById(reqId);

    if (reqt.status === "Completed") {
      return res.status(400).json({
        message: "Training already completed",
      });
    }

     

    const reqUpdate = await trRequest.findByIdAndUpdate(
      reqId,
      { status: "Completed", completedAt: new Date() },
      { new: true },
    );

    if (!reqUpdate) {
      return res.status(404).json({ message: "Training request not found" });
    }

    await trainers.findByIdAndUpdate(assignedTrainer, {
      $inc: { currentLoad: -1 },
    });

    return res.status(200).json({
      message: "Training marked as completed",
      data: reqUpdate,
    });
  } catch (error) {
    console.error("Finish training error:", error);

    return res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
