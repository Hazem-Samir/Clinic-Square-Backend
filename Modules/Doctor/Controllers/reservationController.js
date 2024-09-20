const asyncHandler = require('express-async-handler');
const Reservation = require('../Models/Reservation');

// Get doctor reservations
exports.getDoctorReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({ doctor: req.user._id });
  res.status(200).json(reservations);
});

// Search reservations by patient name
exports.searchReservationsByPatient = asyncHandler(async (req, res) => {
  const { patientName } = req.query;
  const reservations = await Reservation.find({
    doctor: req.user._id,
    patientName: new RegExp(patientName, 'i'),
  });
  res.status(200).json(reservations);
});
