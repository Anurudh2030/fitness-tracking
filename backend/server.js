
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const nutritionRoutes = require("./routes/nutritionRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
const { notFound, errorHandler } = require("./middleware/authMiddleware");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(cors()); // Enable CORS

// Routes
//app.use("/api/users", userRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", authRoutes);

// Error Handling Middleware
//app.use(notFound);
//app.use(errorHandler);


app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ message: err.message });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});