const express = require("express");
const router = express.Router();
const userController = require("../controller/userController.js");

// Create new user
router.post("/", userController.createUser);

module.exports = router;
