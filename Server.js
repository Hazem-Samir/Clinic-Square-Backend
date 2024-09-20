// // ====================== Initialization ======================
// const express = require('express');
// const server = express();
// const PORT = 4000;





// // ====================== Start Server ======================
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });



const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const connectDB = require('./db/dbConnection'); // MongoDB connection
const authRoutes = require('./Routes/auth'); // Authentication routes
const scheduleRoutes = require('./Routes/schedule');
const reservationRoutes = require('./Routes/reservationRoutes');
const prescriptionRoutes = require('./Routes/prescriptionRoutes');
const reviewRoutes = require('./Routes/reviewRoutes');
const discountRoutes = require('./Routes/discountRoutes');



const server = express();
const PORT = 4000;

// Middleware to parse incoming JSON requests
server.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
server.use('/api/auth', authRoutes); // Using the auth routes
server.use('/api/schedule', scheduleRoutes);  // schedule route
server.use('/api/reservations', reservationRoutes);
server.use('/api/prescriptions', prescriptionRoutes);
server.use('/api/reviews', reviewRoutes);
server.use('/api/discounts', discountRoutes);
// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});