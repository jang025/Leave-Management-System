const pool = require("../config/db");

async function createLeavesTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS leaves (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),  
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    leave_type VARCHAR(50) NOT NULL CHECK (leave_type IN ('annual', 'sick')),  
    reason TEXT NOT NULL,                 
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),                        
    decided_by INTEGER REFERENCES users(id),             
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("✅ Leaves table ready");
}

module.exports = { createLeavesTable };
