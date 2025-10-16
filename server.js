const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

// Import Routes
const eventRoutes = require("./src/routes/eventRoutes.js");
const registrationRoutes = require("./src/routes/registrationRoutes.js");
const userRoutes = require("./src/routes/userRoutes.js");

// Use Routes
app.use("/events", eventRoutes);
app.use("/events", registrationRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
