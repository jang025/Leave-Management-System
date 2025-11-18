const express = require("express");
const {
  createLeave,
  getAllLeaves,
} = require("../controllers/employeeController");
const { auth } = require("../middleware/auth");
const { roleCheck } = require("../middleware/roleCheck");
const router = express.Router();

router.post("/leaves/new", auth, roleCheck("employee"), createLeave);
router.get("/leaves", auth, roleCheck("employee"), getAllLeaves);

module.exports = router;
