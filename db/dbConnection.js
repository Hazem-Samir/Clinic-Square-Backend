const mongoose = require('mongoose');
const uri = "mongodb+srv://HazemSamir:4HFwlJBjq8mgG0bl@cluster0.ubz4dy8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
