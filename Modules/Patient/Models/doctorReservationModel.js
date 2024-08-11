const mongoose = require('mongoose');
///1)create schema
const DoctorReservationModel = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, 'reservation date is required'],
    },
    dayName: {
      type: String,
    },
    uploadedTest: {
      type: [String],
      default: null,
    },
    completed: {
      type: Boolean,
      default: false,
    },

    patient: {
      type: mongoose.Schema.ObjectId,
      ref: 'Patient',
    },
    doctor: {
      type: mongoose.Schema.ObjectId,
      ref: 'Dermatologist',
    },

  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

DoctorReservationModel.pre(/^find/, function (next) {
  this.populate({
    path: 'patient',
    select: 'firstName lastName profilePic email',
  });
  next();
});
DoctorReservationModel.pre(/^find/, function (next) {
  this.populate({
    path: 'dermatologist',
    select: 'firstName lastName profilePic',
  });
  next();
});

DoctorReservationModel.pre(/^find/, function (next) {

  this.populate({
    path: 'scan',
    select: 'diseasePhoto diseaseName ',
  });
  next();
});
DoctorReservationModel.virtual('Report', {
  ref: 'Report',
  localField: 'scan.0',
  foreignField: 'scan.0',
  // options: { select: '_id' },
});




module.exports = mongoose.model('DoctorReservation', DoctorReservationModel);
