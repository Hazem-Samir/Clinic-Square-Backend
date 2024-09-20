const express = require('express');
const reservationController = require('../controllers/reservationController');
const router = express.Router();

router.get('/', reservationController.getDoctorReservations);
router.get('/search', reservationController.searchReservationsByPatient);

module.exports = router;
