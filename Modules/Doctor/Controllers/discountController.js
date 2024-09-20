const asyncHandler = require('express-async-handler');
const Discount = require('../Models/Discount');

// Add a new discount coupon
exports.addDiscount = asyncHandler(async (req, res) => {
  const discount = new Discount({ ...req.body, doctor: req.user._id });
  await discount.save();
  res.status(201).json(discount);
});
