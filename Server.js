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

const server = express();
const PORT = 4000;

// Middleware to parse incoming JSON requests
server.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
server.use('/api/auth', authRoutes); // Using the auth routes

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});