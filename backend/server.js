const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const { createUsersTable } = require("./models/User");
const { createLeavesTable } = require("./models/Leave");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Initialise database
async function initDB() {
  try {
    await createUsersTable();
    await createLeavesTable();
    console.log("✅ Database initialized successfully");
  } catch (error) {
    console.error("❌ Database initialization error:", error);
  }
}

app.use("/api/auth", authRoutes);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
