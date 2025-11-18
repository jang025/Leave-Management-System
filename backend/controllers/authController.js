const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const saltRounds = 10;

//! sign up
const signUp = async (req, res) => {
  try {
    const { username, password, confirmPassword, email, role } = req.body;

    // check if all form fields are correctly added
    if (!username || !password || !confirmPassword || !email || !role) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // pool.query always returns an array of rows, even if there’s only one row

    const users = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2 LIMIT 1",
      [username, email]
    );

    // check if user already exists
    if (users.rows.length > 0) {
      res.status(409).json({ message: "Username or email already exists" });
      return;
    }

    // check if password and confirm password matches
    if (password !== confirmPassword) {
      res.status(400).json({ msg: "Passwords do not match" });
      return;
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create a new user
    const result = await pool.query(
      `INSERT INTO users (username, email, password, role, annual_leave_capacity, sick_leave_capacity)
       VALUES ($1, $2, $3, $4, 14, 14)
       RETURNING id, username, email, role, annual_leave_capacity, sick_leave_capacity, created_at`,
      [username, email, hashedPassword, role]
    );

    const newUser = result.rows[0];
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

//! sign in
const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await pool.query(
      "SELECT * FROM users WHERE username = $1 LIMIT 1",
      [username]
    );

    const user = users.rows[0];

    // check if user exists
    if (!user) {
      res.status(401).json({ message: "User not found!" });
      return;
    }

    //Compare passwords
    const match = await bcrypt.compare(password, user.password);

    // If password matches , generate JWT
    if (match) {
      const payload = { id: user.id, username: user.username, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      // return user info
      const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      res.status(200).json({ token, user: userData });
    } else {
      res.status(401).json({ message: "Wrong password" });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  signUp,
  signIn,
};
