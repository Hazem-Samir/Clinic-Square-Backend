const express = require("express");
const router = express.Router();
const { setSchedule, updateSchedule, deleteSchedule } = require("../modules/controllers/scheduleController");

const { authenticateDoctor } = require('../Middleware/authMiddleware'); // Import the middleware
// Set schedule route (to create a new schedule)
router.post("/schedule", authenticateDoctor, setSchedule);

// Update schedule route (to modify existing schedule)
router.put("/schedule/:scheduleId", authenticateDoctor, updateSchedule);

// Delete schedule route (to remove a schedule)
router.delete("/schedule/:scheduleId", authenticateDoctor, deleteSchedule);

module.exports = router;
