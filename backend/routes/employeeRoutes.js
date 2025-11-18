const express = require("express");
const { createLeave } = require("../controllers/employeeController");
const { auth } = require("../middleware/auth");
const { roleCheck } = require("../middleware/roleCheck");
const router = express.Router();

router.post("/leaves", auth, roleCheck("employee"), createLeave);

module.exports = router;
