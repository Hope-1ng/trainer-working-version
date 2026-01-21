const express = require("express");
const cors = require("cors");
const app = express();

require("./config/db");

const authRoutes = require("./routes/authRoutes");
const admin = require("./routes/admin_route");
const ou = require("./routes/ou_routes");
const ko = require("./routes/ko_routes");
const trainer = require("./routes/trainer_routes");

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/admin", admin);
app.use("/ou", ou);
app.use("/ko", ko);
app.use("/trainer", trainer);

app.get("/", (req, res) => {
  res.send("Backend working");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
