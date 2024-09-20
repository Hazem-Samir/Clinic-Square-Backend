const express = require('express');
const prescriptionController = require('../controllers/prescriptionController');
const router = express.Router();

router.post('/', prescriptionController.writePrescription);
router.get('/', prescriptionController.getPrescriptionsByPatient);

module.exports = router;
