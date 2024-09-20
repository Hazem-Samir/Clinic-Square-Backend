const express = require('express');
const { 
  createDiscount, 
  getDiscountsByDoctor, 
  updateDiscount, 
  deleteDiscount 
} = require('../controllers/discountController');
const { protect } = require('../Middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(protect);

// Routes
router.route('/').post(createDiscount).get(getDiscountsByDoctor); // Create a new discount or get discounts by doctor
router.route('/:id').put(updateDiscount).delete(deleteDiscount); // Update or delete a specific discount

module.exports = router;
