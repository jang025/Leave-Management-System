const express = require("express");
const {
  getPendingLeaves,
  approveLeave,
  rejectLeave,
  getPendingLeave,
} = require("../controllers/managerController");
const { auth } = require("../middleware/auth");
const { roleCheck } = require("../middleware/roleCheck");
const router = express.Router();

router.get("/leaves", auth, roleCheck("manager"), getPendingLeaves);
router.get("/leaves/:leaveId", auth, roleCheck("manager"), getPendingLeave);
router.patch(
  "/leaves/:leaveId/approve",
  auth,
  roleCheck("manager"),
  approveLeave
);
router.patch(
  "/leaves/:leaveId/reject",
  auth,
  roleCheck("manager"),
  rejectLeave
);

module.exports = router;
