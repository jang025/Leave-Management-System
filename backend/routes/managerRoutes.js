const express = require("express");
const { getLeaves } = require("../controllers/managerController");
const { auth } = require("../middleware/auth");
const { roleCheck } = require("../middleware/roleCheck");
const router = express.Router();

router.get("/leaves", auth, roleCheck("manager"), getLeaves);

module.exports = router;
