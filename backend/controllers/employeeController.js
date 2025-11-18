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

//! update leave

//! delete leave

module.exports = { createLeave };
