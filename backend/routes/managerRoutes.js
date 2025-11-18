const express = require("express");
const {
  getPendingLeaves,
  approveLeave,
  rejectLeave,
} = require("../controllers/managerController");
const { auth } = require("../middleware/auth");
const { roleCheck } = require("../middleware/roleCheck");
const router = express.Router();

router.get("/leaves", auth, roleCheck("manager"), getPendingLeaves);
router.patch("/leaves/:id/approve", auth, roleCheck("manager"), approveLeave);
router.patch("/leaves/:id/reject", auth, roleCheck("manager"), rejectLeave);

module.exports = router;
