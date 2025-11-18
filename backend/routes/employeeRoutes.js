const express = require("express");
const {
  createLeave,
  getAllLeaves,
  updateLeave,
  deleteLeave,
} = require("../controllers/employeeController");
const { auth } = require("../middleware/auth");
const { roleCheck } = require("../middleware/roleCheck");
const router = express.Router();

router.post("/leaves/new", auth, roleCheck("employee"), createLeave);
router.get("/leaves", auth, roleCheck("employee"), getAllLeaves);
router.patch("/leaves/:id", auth, roleCheck("employee"), updateLeave);
router.delete("/leaves/:id", auth, roleCheck("employee"), deleteLeave);

module.exports = router;
