const express = require("express");
const router = express.Router();
const varify = require("../middleware/verifyToken");
const user = require("../models/User");
const bcrypt = require("bcryptjs");
const trainer = require("../models/trainer");

router.post("/add", async (req, res) => {
  console.log(req.body);

  const { name, email, mobile, role, region, ou, password, skill } = req.body;

  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const data = {
    name,
    email,
    mobile,
    role,
    region,
    ou,
    password: hashedPassword,
  };

  if (skill) {
    data.skill = skill;
  }

  try {
    if (!email || !password || !role || !region || !ou) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await user.create(data);

    res.status(200).json({
      message: "User created successfully",
      userId: newUser._id,
      newUser_role: newUser.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await user.find();

    if (!users) {
      res.status(400).json({ message: "error finding users" });
    }

    res.status(200).json({ data: users });
  } catch (error) {
    console.error(error, "error finding users");
  }
});

router.put("/edit", async (req, res) => {
  const { id, ...updateData } = req.body;
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const updatedUser = await user.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated", data: updatedUser });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
});

router.post("/trainer", async (req, res) => {
  try {
    const Trainer = await trainer.create({
      userId: req.body.userId,
      experience: req.body.experience,
      rating: req.body.rating,
      availability: req.body.availability,
    });
    res.status(201).json({ message: "trainer details added" });
  } catch (error) {
    res.status(500).json({ message: "error addind   trainer data ", error });
  }
});

router.get("/trainers", async (req, res) => {
  try {
    const trainers = await trainer
      .find()
      .populate("userId", "name email mobile skill region ou role status");

    res
      .status(200)
      .json({ message: "trainrs details fetched ", trainers: trainers });
  } catch (error) {
    res.status(500).json({ message: "error fetching trainers details", error });
  }
});

router.put("/status", async (req, res) => {
  try {
    const { userId, status } = req.body;

    if (!userId || !status) {
      return res.status(400).json({
        success: false,
        message: "userId and status are required",
      });
    }

    const updated = await user.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
