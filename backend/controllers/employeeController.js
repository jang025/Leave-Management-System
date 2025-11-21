const pool = require("../config/db");
//! create leave
const createLeave = async (req, res) => {
  try {
    const userId = req.user.id;
    const { leave_type, start_date, end_date, reason } = req.body;

    // check all fields are filled
    if (!leave_type || !start_date || !end_date || !reason) {
      res.status(400).json({ msg: "All fields are required" });
      return;
    }

    // check that start date is not greater than end date
    if (new Date(start_date) > new Date(end_date)) {
      res.status(400).json({ msg: "Start date cannot be after end date" });
      return;
    }

    // check that a user has enough balance leave,  + 1 to include the start date
    const days =
      (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24) + 1;
    if (days <= 0) {
      res.status(400).json({ msg: "Invalid date range" });
      return;
    }
    const users = await pool.query(
      `SELECT annual_leave_capacity, sick_leave_capacity 
       FROM users 
       WHERE id = $1`,
      [userId]
    );

    if (users.rows.length === 0) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    const user = users.rows[0];

    const balance =
      leave_type === "annual"
        ? user.annual_leave_capacity
        : user.sick_leave_capacity;

    if (days > balance) {
      res
        .status(400)
        .json({ msg: "Not enough leave balance to submit this request" });
      return;
    }

    // check that user leave does not overlap with existing leave request (pending or approved)
    const conflict = await pool.query(
      `
      SELECT * FROM leaves
      WHERE user_id = $1
      AND status IN ('pending', 'approved')
      AND (
           start_date <= $3
       AND end_date >= $2
      )
    `,
      [userId, start_date, end_date]
    );
    if (conflict.rows.length > 0) {
      res.status(409).json({ msg: "Leave overlaps with an existing request" });
      return;
    }

    // Insert Leave Request
    const result = await pool.query(
      `INSERT INTO leaves 
        (user_id, leave_type, start_date, end_date, reason, status)
       VALUES ($1, $2, $3, $4, $5, 'pending')
       RETURNING *`,
      [userId, leave_type, start_date, end_date, reason]
    );
    const newLeave = result.rows[0];
    res.status(201).json({
      msg: "Leave request submitted successfully",
      leave: newLeave,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

//! get all leaves
const getAllLeaves = async (req, res) => {
  try {
    const userId = req.user.id;

    const leave = await pool.query(
      `SELECT * 
       FROM leaves 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [userId]
    );

    res.status(200).json(leave.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

//! update leave
const updateLeave = async (req, res) => {
  try {
    const leaveId = req.params.leaveId;
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT * FROM leaves WHERE id = $1 AND user_id = $2`,
      [leaveId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Leave request not found" });
    }

    const leave = result.rows[0];

    if (leave.status !== "pending") {
      return res
        .status(400)
        .json({ msg: "Only pending leave requests can be canceled" });
    }

    const updateResult = await pool.query(
      `UPDATE leaves SET status = 'canceled', updated_at = CURRENT_TIMESTAMP
       WHERE id = $1 
       RETURNING *`,
      [leaveId]
    );

    res.status(200).json({
      msg: "Leave request canceled successfully",
      leave: updateResult.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

//! delete leave
const deleteLeave = async (req, res) => {
  try {
    const leaveId = req.params.leaveId;
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT * FROM leaves WHERE id = $1 AND user_id = $2`,
      [leaveId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Leave request not found" });
    }

    const leave = result.rows[0];

    if (leave.status !== "approved") {
      return res
        .status(400)
        .json({ msg: "Only approved leave requests can be deleted" });
    }

    await pool.query(`DELETE FROM leaves WHERE id = $1`, [leaveId]);

    res.status(200).json({
      msg: "Approved leave request deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

//! get leave balance
const getLeaveBalance = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user's leave capacities
    const userResult = await pool.query(
      `SELECT annual_leave_capacity, sick_leave_capacity 
       FROM users WHERE id = $1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const { annual_leave_capacity, sick_leave_capacity } = userResult.rows[0];

    // Count all the approved annual leaves
    const approvedAnnual = await pool.query(
      `SELECT COUNT(*)   FROM leaves 
       WHERE user_id = $1 AND leave_type = 'annual' AND status = 'approved'`,
      [userId]
    );

    // Count all the approved sick leaves
    const approvedSick = await pool.query(
      `SELECT COUNT(*)   FROM leaves 
       WHERE user_id = $1 AND leave_type = 'sick' AND status = 'approved'`,
      [userId]
    );

    // compute the remaining annual leave
    const annualRemaining =
      annual_leave_capacity - Number(approvedAnnual.rows[0].count);

    // compute the remaining sick leave
    const sickRemaining =
      sick_leave_capacity - Number(approvedSick.rows[0].count);

    res.status(200).json({
      annual_remaining: annualRemaining,
      sick_remaining: sickRemaining,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  createLeave,
  getAllLeaves,
  updateLeave,
  deleteLeave,
  getLeaveBalance,
};
