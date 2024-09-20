const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientName: { type: String, required: true },
  patientPhone: { type: String, required: true },
  date: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }, 
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
