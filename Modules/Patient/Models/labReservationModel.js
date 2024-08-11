const mongoose = require('mongoose');
///1)create schema
const LabReservationsModel = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now() + 2 * 60 * 60 * 1000,
    },
    completed: {
      type: String,
      default: false,
    },
    patient: {
      type: mongoose.Schema.ObjectId,
      ref: 'Patient',
    },

    lab: {
      type: mongoose.Schema.ObjectId,
      ref: 'Lab',
    },
    test: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'TestService',
      },
    ],
 
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

LabReservationsModel.pre(/^find/, function (next) {
  this.populate({
    path: 'test',
    select: 'name cost -lab ',
  });
  next();
});

LabReservationsModel.pre(/^find/, function (next) {
  this.populate({
    path: 'patient',
    select: 'firstName lastName profilePic age',
  });
  next();
});
LabReservationsModel.pre(/^find/, function (next) {
  this.populate({
    path: 'lab',
    select: 'firstName  profilePic location',
  });
  next();
});
///2)create model
module.exports = mongoose.model('LabReservation', LabReservationsModel);
