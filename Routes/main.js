const express = require('express');
const doctorController = require('../controllers/doctorController');
const router = express.Router();

router.get('/profile', doctorController.getDoctorProfile);
router.put('/profile', doctorController.updateDoctorProfile);
router.get('/analytics', doctorController.getDoctorAnalytics);

module.exports = router;
