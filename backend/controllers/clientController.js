const Client = require('../models/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerClient = async (req, res) => {
    try {
        const { name, email, password, age, weight, height } = req.body;

        if (!name || !email || !password || !age || !weight || !height) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingClient = await Client.findOne({ email });
        if (existingClient) {
            return res.status(400).json({ message: "Client already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newClient = new Client({
            name,
            email,
            password: hashedPassword,
            age,
            weight,
            height
        });

        await newClient.save();
        res.status(201).json({ message: "Client registered successfully", client: newClient });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const clientLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if client exists
        const client = await Client.findOne({ email });
        if (!client) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, client.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: client._id, role: 'client' }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const asyncHandler = require("express-async-handler");

// Controller function to get client dashboard data
const getClientDashboard = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Client Dashboard Data",
        user: req.user,
    });
});
module.exports = { registerClient, clientLogin, getClientDashboard };
