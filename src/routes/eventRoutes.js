const express = require("express");
const router = express.Router();
const eventController = require("../controller/eventController.js");

router.post("/create", eventController.createEvent);
router.get("/:id", eventController.getEvent);
router.get("/upcoming/list", eventController.listUpcoming); // optional path
router.get("/:id/stats", eventController.eventStats);

module.exports = router;
