const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//const authMiddleware = require("./middleware/authMiddleware");


dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const appointmentRoutes = require("./appointmentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const clientRoutes = require("./routes/clientRoutes");
const userRoutes = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const trainerRoutes = require("./routes/trainerRoutes");

app.use("/appointments", appointmentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/nutrition", require("./routes/nutritionRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);