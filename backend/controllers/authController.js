// const User = require("../models/User"); // Import User Model
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // User Registration Controller
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({ name, email, password: hashedPassword, role });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// // User Login Controller
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     console.log("Login Attempt:", email); // Debugging
//     const user = await User.findOne({ email });

//     if (!user) {
//       console.log("User Not Found");
//       return res.status(400).json({ message: "Invalid Credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log("Password Mismatch");
//       return res.status(400).json({ message: "Invalid Credentials" });
//     }

//     console.log("User Authenticated:", user._id);
    
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Login Error:", error.message);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };




const User = require("../models/User"); // Import the User model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // 2️⃣ Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 3️⃣ Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // 4️⃣ Send user details & token
        res.status(200).json({ 
            token, 
            user: { id: user._id, name: user.name, email: user.email } 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { loginUser };
