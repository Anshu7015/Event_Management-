const pool = require("../config/db.js");

// Create Event
exports.createEvent = async (req, res) => {
  const { title, date_time, location, capacity } = req.body;
  if (!title || !date_time || !location || !capacity)
    return res.status(400).json({ error: "All fields required" });
  if (capacity <= 0 || capacity > 1000)
    return res.status(400).json({ error: "Capacity must be 1-1000" });

  try {
    const result = await pool.query(
      "INSERT INTO events (title, date_time, location, capacity) VALUES ($1, $2, $3, $4) RETURNING id",
      [title, date_time, location, capacity]
    );
    res.status(201).json({ eventId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Event Details
exports.getEvent = async (req, res) => {
  const eventId = req.params.id;
  try {
    const event = await pool.query("SELECT * FROM events WHERE id=$1", [
      eventId,
    ]);
    if (event.rows.length === 0)
      return res.status(404).json({ error: "Event not found" });

    const users = await pool.query(
      "SELECT u.id, u.name, u.email FROM users u JOIN registrations r ON u.id=r.user_id WHERE r.event_id=$1",
      [eventId]
    );

    res.json({ ...event.rows[0], registrations: users.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List Upcoming Events
exports.listUpcoming = async (req, res) => {
  try {
    const events = await pool.query(
      "SELECT * FROM events WHERE date_time > NOW()"
    );
    events.rows.sort((a, b) => {
      const dateDiff = new Date(a.date_time) - new Date(b.date_time);
      if (dateDiff !== 0) return dateDiff;
      return a.location.localeCompare(b.location);
    });
    res.json(events.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Event Stats
exports.eventStats = async (req, res) => {
  const eventId = req.params.id;
  try {
    const event = await pool.query("SELECT * FROM events WHERE id=$1", [
      eventId,
    ]);
    if (event.rows.length === 0)
      return res.status(404).json({ error: "Event not found" });

    const count = await pool.query(
      "SELECT COUNT(*) FROM registrations WHERE event_id=$1",
      [eventId]
    );
    const total = parseInt(count.rows[0].count);
    const capacity = event.rows[0].capacity;

    res.json({
      totalRegistrations: total,
      remainingCapacity: capacity - total,
      capacityUsedPercent: ((total / capacity) * 100).toFixed(2),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
