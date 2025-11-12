const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const { createUsersTable } = require("./models/User");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
console.log(PORT);

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Initialise database
async function initDB() {
  try {
    await createUsersTable();
    console.log("✅ Database initialized successfully");
  } catch (error) {
    console.error("❌ Database initialization error:", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
