// EDIT THIS



const asyncHandler = require('express-async-handler');
const Dermatologist = require('../models/dermatologistModel');
const factory = require('./handlersFactory');
const ApiError = require('../utils/apiError');


// Upload single image


exports.getDermatologists = factory.getAll(Dermatologist, 'Schedules reviews');
exports.getDermatologist = factory.getOne(Dermatologist, 'Schedules reviews');
exports.createDermatologist = factory.createOne(Dermatologist);
exports.updateDermatologist = asyncHandler(async (req, res, next) => {
  const document = await Dermatologist.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      slug: req.body.slug,
      Phone: req.body.Phone,
      email: req.body.email,
      license: req.body.license,
      city: req.body.city,
      country: req.body.country,
      state: req.body.state,
      profilePic: req.body.profilePic,
      gender: req.body.gender,
      location: req.body.location,
      about: req.body.about,
      educationAndExperience: req.body.educationAndExperience,
      reviews: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Review',
        },
      ],
      rating: Number,
      password: {
        type: String,
        required: true,
        select: false,
      },
    },
    {
      new: true,
    },
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});
exports.deleteDermatologist = factory.deleteOne(Dermatologist);

exports.updateLoggedDermatologistData = asyncHandler(async (req, res, next) => {
  const updatedUser = await Dermatologist.findByIdAndUpdate(
    req.user._id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      slug: req.body.slug,
      Phone: req.body.Phone,
      email: req.body.email,
      license: req.body.license,
      city: req.body.city,
      country: req.body.country,
      state: req.body.state,
      profilePic: req.body.profilePic,
      gender: req.body.gender,
      location: req.body.location,
      about: req.body.about,
      educationAndExperience: req.body.educationAndExperience,
    },
    { new: true },
  );


  res.status(200).json({ data: updatedUser });
});

exports.setDermatologistToBody = (req, res, next) => {
  //nested route {create}
  if (!req.body.role) req.body.role = 'dermatologist';
  next();
7};