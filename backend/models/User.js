const pool = require("../config/db");

async function createUsersTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role TEXT CHECK (role IN ('manager', 'employee')),  
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      annual_leave_capacity INTEGER,
      sick_leave_capacity INTEGER
    );
  `);
  console.log("✅ Users table ready");
}

module.exports = { createUsersTable };
