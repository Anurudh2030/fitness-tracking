const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Appointment = require("../models/Appointment");
// Fix the import path - use "middleware" (singular) instead of "middlewares" (plural)
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

// 📌 Process Payment
router.post("/process", auth, async (req, res) => {
  try {
    const { appointmentId, amount, paymentMethodId } = req.body;

    if (!appointmentId || !amount || !paymentMethodId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: "inr",
      payment_method: paymentMethodId,
      confirm: true,
    });

    // Update appointment payment status
    await Appointment.findByIdAndUpdate(appointmentId, { paymentStatus: "paid" });

    res.status(200).json({ message: "Payment successful", paymentIntent });
  } catch (error) {
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
});

module.exports = router;