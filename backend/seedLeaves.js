const pool = require("./config/db");

async function seedLeaves() {
  try {
    console.log("Seeding leaves...");

    await pool.query(`
      INSERT INTO leaves (user_id, start_date, end_date, leave_type, reason, status)
      VALUES
        (1, '2025-12-15', '2025-12-16', 'annual', 'Snow Boarding', 'pending')
    `);
    console.log("✅ Leaves seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding leaves:", err.message);
  } finally {
    await pool.end();
  }
}

seedLeaves();
