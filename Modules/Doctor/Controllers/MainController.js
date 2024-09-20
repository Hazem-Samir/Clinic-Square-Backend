const asyncHandler = require('express-async-handler');
const Doctor = require('../Models/Doctor');
const Reservation = require('../Models/Reservation');
const Prescription = require('../Models/Prescription');
const Review = require('../Models/Review');

//  get doctor profile
exports.getDoctorProfile = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.user._id).populate('reservations reviews');
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
  }
  res.status(200).json(doctor);
});

//  update doctor profile
exports.updateDoctorProfile = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.user._id, req.body, { new: true });
  res.status(200).json(doctor);
});

//  monthly income and analytics
exports.getDoctorAnalytics = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;

  // monthly income and average income
  const reservations = await Reservation.find({ doctor: doctorId });
  const totalIncome = reservations.reduce((acc, reservation) => acc + reservation.fee, 0);
  const avgIncome = totalIncome / reservations.length;

  //  average rating
  const reviews = await Review.find({ doctor: doctorId });
  const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  //  most frequently reserved day
  const reservationDays = reservations.map(reservation => reservation.date.getDay());
  const mostFrequentDay = reservationDays.sort((a, b) =>
    reservationDays.filter(v => v === a).length - reservationDays.filter(v => v === b).length
  ).pop();

  res.status(200).json({ totalIncome, avgIncome, avgRating, mostFrequentDay });
});
