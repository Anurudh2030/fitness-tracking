const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// 🔹 Login User
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with:", { email, password: "REDACTED" });
  
  const user = await User.findOne({ email });
  console.log("User found in database:", user ? "YES" : "NO");
  
  if (!user) {
    console.log("Login failed: User not found");
    res.status(401);
    throw new Error("Invalid email or password");
  }
  
  console.log("Stored password hash:", user.password);
  let isMatch = await bcrypt.compare(password, user.password);
  console.log("Password match result:", isMatch ? "MATCH" : "NO MATCH");
  
  if (!isMatch && !user.password.startsWith('$2a')) {
    if (password === user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      console.log("Plaintext password detected and rehashed for security");
      isMatch = true;
    }
  }
  
  if (isMatch) {
    console.log("Login successful for user:", user.name);
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    console.log("Login failed: Password mismatch");
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// 🔹 Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// 🔹 Get User Profile
const getUserProfile = asyncHandler(async (req, res) => {
  // req.user is set by the protect middleware
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { authUser, registerUser, getUserProfile };