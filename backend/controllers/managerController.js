const pool = require("../config/db");

const getPendingLeaves = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        l.*,
        u.username,
        u.role
      FROM leaves AS l
      INNER JOIN users AS u ON l.user_id = u.id
      WHERE l.status = 'pending'
      ORDER BY l.created_at DESC
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const getPendingLeave = async (req, res) => {
  try {
    const leaveId = req.params.leaveId;

    const result = await pool.query(
      `
      SELECT 
      l.*,
      u.username,
      u.role
      FROM leaves AS l
      INNER JOIN users AS u ON l.user_id = u.id
      WHERE l.id = $1 AND l.status = 'pending'
    `,
      [leaveId]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const approveLeave = async (req, res) => {
  try {
    const leaveId = req.params.leaveId;

    const result = await pool.query("SELECT * FROM leaves WHERE id = $1", [
      leaveId,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Leave request not found" });
    }

    const leave = result.rows[0];

    if (leave.status !== "pending") {
      return res
        .status(400)
        .json({ msg: "Only pending requests can be approved" });
    }

    await pool.query(`UPDATE leaves SET status = 'approved' WHERE id = $1`, [
      leaveId,
    ]);

    res.status(200).json({ msg: "Leave approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const rejectLeave = async (req, res) => {
  try {
    const leaveId = req.params.leaveId;

    const result = await pool.query("SELECT * FROM leaves WHERE id = $1", [
      leaveId,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Leave request not found" });
    }

    const leave = result.rows[0];

    if (leave.status !== "pending") {
      return res
        .status(400)
        .json({ msg: "Only pending requests can be rejected" });
    }

    await pool.query(`UPDATE leaves SET status = 'rejected' WHERE id = $1`, [
      leaveId,
    ]);

    res.status(200).json({ msg: "Leave rejected successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  getPendingLeaves,
  getPendingLeave,
  approveLeave,
  rejectLeave,
};
