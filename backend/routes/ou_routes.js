const express = require("express");
const router = express.Router();
const request = require("../models/traning_req");
const varify = require("../middleware/verifyToken");

router.post("/add_req", varify, async (req, res) => {
  console.log(req.user);

  try {
    const {
      trainingTitle,
      place,
      contact,
      skill,
      region,
      ou,
      preferredMode,
      expectedStartDate,
      totalHrs,
      durationInDays,
      expectedParticipants,
    } = req.body;

    if (
      !trainingTitle ||
      !place ||
      !contact ||
      !skill ||
      !ou ||
      !region ||
      !preferredMode ||
      !expectedStartDate ||
      !totalHrs ||
      !durationInDays ||
      !expectedParticipants
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const trainingRequest = await request.create({
      requestedBy: req.user?.id,
      trainingTitle,
      skill,
      contact,
      place,
      ou,
      region,
      preferredMode,
      expectedStartDate,
      totalHrs,
      durationInDays,
      expectedParticipants,
    });

    res.status(201).json({
      message: "Training request created successfully",
      data: trainingRequest,
    });
  } catch (error) {
    console.error("Create Training Request Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/reqs", async (req, res) => {
  try {
    const data = await request.find();
    if (!data) {
      res.status(400).json({ message: "cannot find requestes" });
    }
    res.status(200).json({ message: "req data fetched ", data: data });
  } catch (error) {
    console.error("error finding requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update_req", async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      return res.status(400).json({ message: "requst ID is required" });
    }

    const updatedUser = await request.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "requst not found" });
    }

    res.json({ message: "requst updated", data: updatedUser });
  } catch (error) {
    console.error("UPDATE REQUST ERROR:", error);
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
});

module.exports = router;
