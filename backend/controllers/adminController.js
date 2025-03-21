const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Trainer = require("../models/trainerModel");
const jwt = require("jsonwebtoken");
const Workout = require("../models/Workout");
const Nutrition = require("../models/NutritionModel");
const Appointment = require("../models/Appointment");
const Payment = require("../models/paymentModel"); // Ensure this model is imported

// Get all users (paginated)
const getUsers = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const users = await User.find({ role: "user" })
      .select("-password")
      .skip(skip)
      .limit(limit);
    
    const total = await User.countDocuments({ role: "user" });
    
    res.json({
      users,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    });
});

// Update user
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select("-password");
    
    res.json(updatedUser);
});

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User removed" });
});

// Admin login function
const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.json({ token, message: "Admin logged in successfully" });
    }
    res.status(401).json({ message: "Invalid credentials" });
});

// Fetch all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Fetch all trainers
const getAllTrainers = asyncHandler(async (req, res) => {
    const trainers = await Trainer.find();
    res.json(trainers);
});

// Get all admins
const getAdmins = asyncHandler(async (req, res) => {
    const admins = await User.find({ role: "admin" });
    res.json(admins);
});

// Get all trainers with pagination
const getTrainers = asyncHandler(async (req, res) => {
    const status = req.query.status || "all";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let query = {};
    if (status !== "all") {
        query = { status };
    }
    
    const trainers = await Trainer.find(query)
      .populate("user", "name email")
      .skip(skip)
      .limit(limit);
    
    const total = await Trainer.countDocuments(query);
    
    res.json({
      trainers,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    });
});

// Update trainer status
const updateTrainerStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    
    if (!["pending", "approved", "rejected"].includes(status)) {
        res.status(400);
        throw new Error("Invalid status");
    }
    
    const trainer = await Trainer.findById(req.params.id);
    
    if (!trainer) {
        res.status(404);
        throw new Error("Trainer not found");
    }
    
    trainer.status = status;
    await trainer.save();
    
    // If approved, update the user role to "trainer"
    if (status === "approved") {
        await User.findByIdAndUpdate(trainer.user, { role: "trainer" });
    }
    
    res.json(trainer);
});

// Dashboard statistics
const getDashboardStats = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalTrainers = await User.countDocuments({ role: "trainer" });
    const pendingTrainers = await Trainer.countDocuments({ status: "pending" });
    const totalWorkouts = await Workout.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
  
    // Monthly registration stats (past 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
    const userRegistrations = await User.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        {
            $group: {
                _id: { 
                    month: { $month: "$createdAt" }, 
                    year: { $year: "$createdAt" } 
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
  
    res.json({
        counts: {
            users: totalUsers,
            trainers: totalTrainers,
            pendingTrainers,
            workouts: totalWorkouts,
            appointments: totalAppointments
        },
        userRegistrations
    });
});

// Get all appointments
const getAppointments = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const { status, startDate, endDate } = req.query;
    let query = {};
    
    if (status) {
        query.status = status;
    }
    
    if (startDate && endDate) {
        query.date = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    }
    
    const appointments = await Appointment.find(query)
      .populate("user", "name email")
      .populate("trainer", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ date: 1 });
    
    const total = await Appointment.countDocuments(query);
    
    res.json({
      appointments,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    });
});

// Get all payments
const getPayments = asyncHandler(async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});


const updatePayment = asyncHandler(async (req, res) => {
    try {
        const { status } = req.body;
        if (!["pending", "completed", "failed"].includes(status)) {
            return res.status(400).json({ message: "Invalid payment status" });
        }

        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        payment.status = status;
        await payment.save();

        res.json({ message: "Payment status updated successfully", payment });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Update appointment status
const updateAppointment = asyncHandler(async (req, res) => {
    const { status } = req.body;
    
    if (!["pending", "confirmed", "canceled", "completed"].includes(status)) {
        res.status(400);
        throw new Error("Invalid status");
    }
    
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
        res.status(404);
        throw new Error("Appointment not found");
    }
    
    appointment.status = status;
    await appointment.save();
    
    res.json(appointment);
});

// Export all functions
module.exports = { 
    getAdmins, 
    getUsers,
    updateUser,
    deleteUser,
    adminLogin,
    getAllUsers,
    getAllTrainers,
    getTrainers,
    updateTrainerStatus,
    getDashboardStats,
    getAppointments,
    getPayments,
    updatePayment,
    updateAppointment
};
