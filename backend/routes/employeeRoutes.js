const express = require("express");
const {
  createLeave,
  getAllLeaves,
  updateLeave,
} = require("../controllers/employeeController");
const { auth } = require("../middleware/auth");
const { roleCheck } = require("../middleware/roleCheck");
const router = express.Router();

router.post("/leaves/new", auth, roleCheck("employee"), createLeave);
router.get("/leaves", auth, roleCheck("employee"), getAllLeaves);
router.patch("/leaves/:id", auth, roleCheck("employee"), updateLeave);

module.exports = router;
