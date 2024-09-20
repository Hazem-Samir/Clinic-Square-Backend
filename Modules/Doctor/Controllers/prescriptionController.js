const asyncHandler = require('express-async-handler');
const Prescription = require('../Models/Prescription');

// Create a prescription
exports.writePrescription = asyncHandler(async (req, res) => {
  const prescription = new Prescription({ ...req.body, doctor: req.user._id });
  await prescription.save();
  res.status(201).json(prescription);
});

// View previous prescriptions
exports.getPrescriptionsByPatient = asyncHandler(async (req, res) => {
  const prescriptions = await Prescription.find({ doctor: req.user._id, patientName: req.query.patientName });
  res.status(200).json(prescriptions);
});
