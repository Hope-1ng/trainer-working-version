const mongoose = require("mongoose");

const trainingRequestSchema = new mongoose.Schema(
  {
    // Requestor details
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Training metadata
    trainingTitle: {
      type: String,
      required: true,
      trim: true,
    },

    contact: {
      type: String,
      required: true,
    },

    skill: {
      type: String,
      required: true,
    },

    place: {
      type: String,
      required: true,
    },

    ou: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },

    // Training logistics
    preferredMode: {
      type: String,
      enum: ["Online", "Classroom", "Hybrid"],
      required: true,
    },
    expectedStartDate: {
      type: Date,
      required: true,
    },
    totalHrs: {
      type: Number,
      required: true,
    },
    durationInDays: {
      type: Number,
      required: true,
    },
    expectedParticipants: {
      type: Number,
      required: true,
    },
    assignedTrainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      default: null,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Trainer Assigned",
        "Completed",
      ],
      default: "Pending",
    },
    completedAt: {
      type: Date,
      default: null,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    approvalDate: {
      type: Date,
      default: null,
    },
    rejectionReason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("TrainingRequest", trainingRequestSchema);
