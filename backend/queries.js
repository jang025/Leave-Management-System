const pool = require("./config/db");

// Seed users
async function seedUsers() {
  try {
    console.log("Seeding users...");

    await pool.query(`
      INSERT INTO users (id,username, email, password, role, leave_capacity)
      VALUES
        (1,'jeremy', 'jeremy@hotmail.com', 'password', 'employee', 14),
        (2,'june', 'june@hotmail.com', 'password', 'employee', 14),
        (3,'poorani', 'poorani@hotmail.com', 'password', 'employee', 14),
        (4,'simon', 'simon@hotmail.com', 'password', 'manager', NULL)
    `);

    console.log("✅ Users seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding users:", err.message);
  } finally {
    await pool.end();
  }
}

seedUsers();
