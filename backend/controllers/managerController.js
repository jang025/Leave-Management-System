const pool = require("../config/db");

const getLeaves = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        l.*,
        u.username,
        u.role
      FROM leaves AS l
      INNER JOIN users AS u ON l.user_id = u.id
      ORDER BY l.created_at DESC
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = { getLeaves };
