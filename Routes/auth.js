const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Doctor = require("../Modules/Doctor/Models/Doctor");
const jwt = require('jsonwebtoken');

router.post(
  '/login',
  body('email').isEmail().withMessage('Please enter a valid email!'),
  body('password').isLength({ min: 8, max: 12 }).withMessage('Password should be between 8-12 characters'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if email exists
      const doctor = await Doctor.findOne({ email: req.body.email });
      if (!doctor) {
        return res.status(404).json({ errors: [{ msg: 'Email or password not found!' }] });
      }

      // Compare password
      const isMatch = await bcrypt.compare(req.body.password, doctor.password);
      if (!isMatch) {
        return res.status(404).json({ errors: [{ msg: 'Email or password not found!' }] });
      }

      // Generate JWT token
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token will expire in 1 hour
      });

      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ err });
    }
  }
);

// Register Route
router.post(
  "/register",
  body("email").isEmail().withMessage("Please enter a valid email!"),
  body("firstName")
    .isString()
    .withMessage("Please enter a valid first name")
    .isLength({ min: 2, max: 32 })
    .withMessage("First name should be between 2-32 characters"),
  body("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("Password should be between 8-12 characters"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const existingDoctor = await Doctor.findOne({ email: req.body.email });
      if (existingDoctor) {
        return res.status(400).json({ errors: [{ msg: "Email already exists!" }] });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 12);

      const newDoctor = new Doctor({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        city: req.body.city,
        license: req.body.license,
        token: crypto.randomBytes(16).toString("hex"),
      });

      await newDoctor.save();
      const { password, ...userWithoutPassword } = newDoctor.toObject();
      res.status(200).json(userWithoutPassword);
    } catch (err) {
      res.status(500).json({ err });
    }
  }
);

module.exports = router;
