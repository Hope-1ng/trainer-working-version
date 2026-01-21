const mongoose = require("mongoose");
const trainerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    experience: {
      type: Number,
      min: 0,
      required: true
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },

    availability: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available"
    },

    currentLoad: {
      type: Number,
      default: 0
    },

    maxLoad: {
      type: Number,
      default: 4
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trainer", trainerSchema);
