const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.mongodb_url)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    console.log("DB NAME:", mongoose.connection.name);
  })
  .catch((error) => console.log("MongoDB Connection Error:", error));
