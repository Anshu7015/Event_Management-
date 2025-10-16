const express = require("express");
const router = express.Router();
const registrationController = require("../controller/registrationController.js");

router.post("/:id/register", registrationController.register);
router.delete("/:id/register/:userId", registrationController.cancel);

module.exports = router;
