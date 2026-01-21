/*const mongoose=require('mongoose')
const schema=mongoose.Schema({
  email: String,
  password: String,
  role: String,
})
const userModel=mongoose.model('user',schema)
module.exports=userModel */

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     required: true
//   }
// });

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false // still hide password by default
    },

    mobile: {
      type: String,
      trim: true
    },

    role: {
      type: String,
      enum: [
    "Admin",
    "CEO",
    "KO Head",
    "KO Lead",
    "OU Coordinator",
    "OU Head",
    "Trainer",
  ],
      required: true
    },

    skill: {
      type: String,
      trim: true
    },

    region: {
      type: String,
      required: true,
      trim: true
    },

    ou: {
      type: String,
      required: true,
      trim: true
    },

    exp: {
      type: Number,
      min: 0
    },

    status: {
      type: String,
      enum: ["Active", "inactive"],
      default: "Active"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);


