const pool = require("./config/db");

async function seedUsers() {
  try {
    console.log("Seeding users...");

    await pool.query(`
      INSERT INTO users (username, email, password, role, annual_leave_capacity, sick_leave_capacity)
      VALUES
        ('jeremy', 'jeremy@hotmail.com', 'password', 'employee', 14, 14),
        ('june', 'june@hotmail.com', 'password', 'employee', 14, 14),
        ('poorani', 'poorani@hotmail.com', 'password', 'employee', 14, 14),
        ('simon', 'simon@hotmail.com', 'password', 'manager', NULL, NULL)
    `);

    console.log("✅ Users seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding users:", err.message);
  } finally {
    await pool.end();
  }
}

seedUsers();
