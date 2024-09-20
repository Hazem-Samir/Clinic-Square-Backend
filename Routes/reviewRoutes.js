const express = require('express');
const { 
  createReview, 
  getReviewsByDoctor, 
  getReviewById, 
  updateReview, 
  deleteReview 
} = require('../controllers/reviewController');
const { protect } = require('../Middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(protect);

// Routes
router.route('/').post(createReview).get(getReviewsByDoctor); // Create a new review or get reviews by doctor
router.route('/:id').get(getReviewById).put(updateReview).delete(deleteReview); // Get, update, or delete a specific review

module.exports = router;
