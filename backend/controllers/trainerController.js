const Trainer = require("../models/Trainer");
const bcrypt = require("bcryptjs");
// Ensure this model exists

// Register Trainer
const registerTrainer = async (req, res) => {
    try {
        const { name, email, password, experience, specialization } = req.body;

        if (!name || !email || !password || !experience || !specialization) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingTrainer = await Trainer.findOne({ email });
        if (existingTrainer) {
            return res.status(400).json({ message: "Trainer already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const trainer = new Trainer({ name, email, password: hashedPassword, experience, specialization });

        await trainer.save();
        res.status(201).json({ message: "Trainer registered successfully", trainer });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
// Get All Trainers
const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Assign Client to Trainer
const assignClient = async (req, res) => {
    try {
      const { trainerId, clientId } = req.body;
  
      // Validate request
      if (!trainerId || !clientId) {
        return res.status(400).json({ message: "Trainer ID and Client ID are required" });
      }
  
      // Find the trainer
      const trainer = await Trainer.findById(trainerId);
      if (!trainer) {
        return res.status(404).json({ message: "Trainer not found" });
      }
  
      // Ensure `clients` array exists before pushing
      if (!trainer.clients) {
        trainer.clients = [];  // Initialize if undefined
      }
  
      // Add client if not already assigned
      if (!trainer.clients.includes(clientId)) {
        trainer.clients.push(clientId);
      } else {
        return res.status(400).json({ message: "Client is already assigned to this trainer" });
      }
  
      await trainer.save();
      res.status(200).json({ message: "Client assigned to trainer successfully", trainer });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

// ✅ Correctly Export Functions
module.exports = {
  registerTrainer,
  getTrainers,
  assignClient
};
