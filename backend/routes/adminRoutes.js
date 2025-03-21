const express = require("express");
const { 
    adminLogin, 
    getPayments, 
    updatePayment, 
    getAppointments, 
    updateAppointment, 
    getUsers, 
    updateUser, 
    deleteUser, 
    getTrainers,
    updateTrainerStatus 
} = require("../controllers/adminController"); // ✅ Import all required functions

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/payments", protect, admin, getPayments);
router.put("/payments/:id", protect, admin, updatePayment);
router.get("/appointments", protect, admin, getAppointments);
router.put("/appointments/:id", protect, admin, updateAppointment);

router.post("/login", adminLogin);
router.get("/users", protect, admin, getUsers);
router.put("/users/:id", protect, admin, updateUser);
router.delete("/users/:id", protect, admin, deleteUser);
router.get("/trainers", protect, admin, getTrainers);
router.put("/trainers/:id", protect, admin, updateTrainerStatus);

module.exports = router;
