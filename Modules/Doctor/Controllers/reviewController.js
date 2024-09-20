const asyncHandler = require('express-async-handler');
const Review = require('../Models/Review');

// Get doctor reviews and average rating
exports.getDoctorReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ doctor: req.user._id });
  const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  res.status(200).json({ reviews, avgRating });
});
