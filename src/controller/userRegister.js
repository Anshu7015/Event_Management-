const pool = require("../config/db.js");

exports.createUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    // Validate inputs
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    // Check if email already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Insert new user and return id, name, email
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email",
      [name, email]
    );

    res.status(201).json({
      message: "User created successfully",
      user: result.rows[0], // contains id, name, email
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
