const express = require("express");
const router = express.Router();
const userModel = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post("/login", async (req, res) => {
  try {
    console.log("LOGIN HIT", req.body);

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }) .select("+password");;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔹 If password is NOT hashed (old users)
    if (typeof user.password === "string" && !user.password.startsWith("$2")) {
      // check plain text match
    if (user.password !== req.body.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // hash and update DB
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
      await user.save();
    }

    // 🔹 Normal bcrypt compare (for hashed passwords)
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "invalid credential" });
    }

    let payload = { email: user.email, role: user.role, id: user._id };
    const token = jwt.sign(payload, 'secret_key');

    res.status(200).json({
      message: "Login success",
      token: token, 
      user: user
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router; 

/*const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/User");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router; */

