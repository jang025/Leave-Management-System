const express = require("express");
const {
  createLeave,
  getAllLeaves,
  updateLeave,
  deleteLeave,
  getLeaveBalance,
} = require("../controllers/employeeController");
const { auth } = require("../middleware/auth");
const { roleCheck } = require("../middleware/roleCheck");
const router = express.Router();

router.post("/leaves/new", auth, roleCheck("employee"), createLeave);
router.get("/leaves", auth, roleCheck("employee"), getAllLeaves);
router.patch("/leaves/:leaveId", auth, roleCheck("employee"), updateLeave);
router.delete("/leaves/:leaveId", auth, roleCheck("employee"), deleteLeave);
router.get("/leaves/balance", auth, roleCheck("employee"), getLeaveBalance);

module.exports = router;
