const jwt = require('jsonwebtoken');
const Doctor = require('../Modules/Doctor/Models/Doctor'); // Import the Doctor model

// Authentication middleware for protecting routes
exports.authenticateDoctor = async (req, res, next) => {
  let token;

  // Check if the Authorization header is set and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Extract the token
  }

  // If no token is provided, return an error
  if (!token) {
    return res.status(401).json({ message: 'You are not logged in. Please log in to get access.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the doctor by the ID decoded from the token
    const doctor = await Doctor.findById(decoded.id);
    if (!doctor) {
      return res.status(401).json({ message: 'The user belonging to this token no longer exists.' });
    }

    // Attach the doctor to the request object for use in later middleware or routes
    req.user = doctor;
    next(); // Move to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token or token expired. Please log in again.' });
  }
};
