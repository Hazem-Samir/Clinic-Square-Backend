const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
///1)create schema
const LabModel = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, 'Name required'],
      minlenth: [2, 'too short  name'],
      maxlength: [32, 'too long  name'],
    },
    profilePic: {
      type: String,
      
    },
    phone: {
      type: String,
      min: [11, 'incorrect mobile number'],
    },
    location: {
      type: String,
      required: [true, 'address is required'],
    },
    city: {
      type: String,
      required: [true, 'city is required'],
    },
    license: {
      type: [String],
      // required: [true, 'license is required'],
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
    passwordChangedAt:Date,
    passwordResetCode: String,
    passwordResetExpires:Date,
    passwordResetVerified:Boolean,
    state: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: 'lab',
    },
    // active:{
    //   type: Boolean,
    //   default: true,
    // },
    ratingsAverage: {
      type: Number,
      min: [1, 'Rating must be above or equal 1.0'],
      max: [5, 'Rating must be below or equal 5.0'],
      // set: (val) => Math.round(val * 10) / 10, // 3.3333 * 10 => 33.333 => 33 => 3.3
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  
);

LabModel.virtual('patients', {
  ref: 'LabReservation',
  localField: '_id',
  foreignField: 'lab',
});
LabModel.virtual('Services', {
  ref: 'TestService',
  localField: '_id',
  foreignField: 'lab',
});
LabModel.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'lab',
});
LabModel.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
///2)create model
module.exports = mongoose.model('LabModel', LabModel);
