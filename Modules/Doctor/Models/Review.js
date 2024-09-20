const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientName: { type: String, required: true },
  rating: { type: Number, required: true }, // Rating from 1 to 5
  comment: String,
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
