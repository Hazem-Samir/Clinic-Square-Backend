const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

///1)create schema
const Doctor = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Name required'],
      minlenth: [2, 'too short  name'],
      maxlength: [32, 'too long  name'],
    },
    lastName: {
      type: String,
      required: [true, 'Name required'],
      minlength: [2, 'too short  name'],
      maxlength: [32, 'too long  name'],
    },
    gender: {
      type: String,
      required: [true, 'gender required'],
      enum: ['male', 'female'],
      lowercase: true,
    },

    phone: {
      type: String,
      min: [11, 'incorrect mobile number'],
      max: [11, 'incorrect mobile number '],
    },
    location: {
      type: String,
    },
    city: {
      type: String,
      required: [true, 'city is required'],
    },
    about: {
      type: String,
      default: 'dermatologist',
    },
    license: {
      type: [String],
      required: [true, 'license is required'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'password required'],
      minlength: [6, 'Too short password'],
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    profilePic: {
      type: String,
    },
    // sessionCost: {
    //   type: Number,
    //   required: [true, 'Session cost is required'],
    // },

    state: {
      type: Boolean,
      default: false,
    },
    // active: {
      // type: Boolean,
      // default: true,
    // },
    // slug: {
    //   type: String,
    //   lowercase: true,
    // },
    role: {
      type: String,
      default: 'Doctor',
    },
    ratingsAverage: {
      type: Number,
      min: [1, 'Rating must be above or equal 1.0'],
      max: [5, 'Rating must be below or equal 5.0'],
      // set: (val) => Math.round(val * 10) / 10, // 3.3333 * 10 => 33.333 => 33 => 3.3
    },
  },
  // {
  //   timestamps: true,

  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // },
);

Doctor.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

Doctor.virtual('reservations', {
    ref: 'DoctorReservation',
    localField: '_id',
    foreignField: 'dermatologist',
  });
  Doctor.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'dermatologist',
  });
Doctor.virtual('Schedules', {
  ref: 'DoctorSchedule',
  localField: '_id',
  foreignField: 'dermatologist',
});
Doctor.virtual('reservations', {
  ref: 'DoctorReservation',
  localField: '_id',
  foreignField: 'dermatologist',
});

///2)create model
module.exports = mongoose.model('Doctor', Doctor);
