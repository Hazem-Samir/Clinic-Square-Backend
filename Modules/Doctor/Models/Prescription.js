const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientName: { type: String, required: true },
  patientPhone: { type: String, required: true },
  medication: { type: String, required: true },
  dosage: { type: String, required: true },
  notes: String,
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;
