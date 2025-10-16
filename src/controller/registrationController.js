const pool = require("../config/db.js");

// Register for Event
exports.register = async (req, res) => {
  const eventId = req.params.id;
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "User ID required" });

  try {
    const event = await pool.query("SELECT * FROM events WHERE id=$1", [
      eventId,
    ]);
    if (event.rows.length === 0)
      return res.status(404).json({ error: "Event not found" });
    const e = event.rows[0];

    if (new Date(e.date_time) < new Date())
      return res.status(400).json({ error: "Cannot register for past events" });

    const count = await pool.query(
      "SELECT COUNT(*) FROM registrations WHERE event_id=$1",
      [eventId]
    );
    if (parseInt(count.rows[0].count) >= e.capacity)
      return res.status(400).json({ error: "Event full" });

    const existing = await pool.query(
      "SELECT * FROM registrations WHERE event_id=$1 AND user_id=$2",
      [eventId, userId]
    );
    if (existing.rows.length > 0)
      return res.status(400).json({ error: "User already registered" });

    await pool.query(
      "INSERT INTO registrations (user_id, event_id) VALUES ($1, $2)",
      [userId, eventId]
    );
    res.json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel Registration
exports.cancel = async (req, res) => {
  const { id, userId } = req.params;

  try {
    const existing = await pool.query(
      "SELECT * FROM registrations WHERE event_id=$1 AND user_id=$2",
      [id, userId]
    );
    if (existing.rows.length === 0)
      return res.status(400).json({ error: "User not registered" });

    await pool.query(
      "DELETE FROM registrations WHERE event_id=$1 AND user_id=$2",
      [id, userId]
    );
    res.json({ message: "Registration cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
