const pool = require("../config/db");

async function createUsersTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL CHECK(role IN ('employee', 'manager')),  
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      leave_capacity INTEGER
    );
  `);
  console.log("✅ Users table ready");
}

module.exports = { createUsersTable };
