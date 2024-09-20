const asyncHandler = require('express-async-handler');
const Schedule = require('../Models/scheduleModel'); 
const ApiError = require('../utils/apiError'); // Custom error handler

// Set Schedule
exports.setSchedule = asyncHandler(async (req, res, next) => {
  const { day, startTime, endTime, sessionCost } = req.body;

  // Validation: Check if endTime is greater than startTime
  if (new Date(startTime) >= new Date(endTime)) {
    return next(new ApiError('End time must be after start time', 400));
  }

  // Create a new schedule
  const schedule = await Schedule.create({
    day,
    startTime,
    endTime,
    sessionCost,
    dermatologist: req.user._id
  });

  res.status(201).json({ message: "Schedule created successfully", data: schedule });
});

// Update Schedule
exports.updateSchedule = asyncHandler(async (req, res, next) => {
  const { scheduleId } = req.params;
  const { day, startTime, endTime, sessionCost } = req.body;

  // Find the schedule by ID and update
  const schedule = await Schedule.findByIdAndUpdate(
    scheduleId,
    { day, startTime, endTime, sessionCost },
    { new: true, runValidators: true }
  );

  if (!schedule) {
    return next(new ApiError('No schedule found with that ID', 404));
  }

  res.status(200).json({ message: "Schedule updated successfully", data: schedule });
});

// Delete Schedule
exports.deleteSchedule = asyncHandler(async (req, res, next) => {
  const { scheduleId } = req.params;

  // Find and delete the schedule
  const schedule = await Schedule.findByIdAndDelete(scheduleId);

  if (!schedule) {
    return next(new ApiError('No schedule found with that ID', 404));
  }

  res.status(204).json({ message: "Schedule deleted successfully" });
});
