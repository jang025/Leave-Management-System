const pool = require("./config/db");

async function seedLeaves() {
  try {
    console.log("Seeding leaves...");

    await pool.query(`
      INSERT INTO leaves (user_id, start_date, end_date, leave_type, reason, status, decided_by)
      VALUES
        (1, '2025-12-10', '2025-12-12', 'annual', 'Family trip', 'pending', NULL),
        (3, '2025-11-15', '2025-11-16', 'sick', 'Flu recovery', 'approved', 4),
        (1, '2025-10-05', '2025-10-06', 'sick', 'Personal errands', 'rejected', 4)
    `);
    console.log("✅ Leaves seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding leaves:", err.message);
  } finally {
    await pool.end();
  }
}

seedLeaves();
