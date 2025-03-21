const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { protect, admin, notFound, errorHandler };



// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");
// const User = require("../models/userModel");

// // ✅ Middleware to protect routes
// const protect = asyncHandler(async (req, res, next) => {
//   let token;
  
//   console.log("Headers:", req.headers);

//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       console.log("Token received:", token);
//       console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
      
//       // Debugging: Check JWT_SECRET
//       if (!process.env.JWT_SECRET) {
//         return res.status(500).json({ message: "Server error: JWT_SECRET not configured" });
//       }
      
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log("Decoded token:", decoded);
      
//       req.user = await User.findById(decoded.id).select("-password");
//       console.log("Found user:", req.user);

//       if (!req.user) {
//         res.status(401);
//         throw new Error("User not found");
//       }

//       next();
//     } catch (error) {
//       console.error("Auth Error Details:", error);
//       res.status(401).json({ message: "Not authorized, token failed", error: error.message });
//     }
//   } else {
//     res.status(401).json({ message: "Not authorized, no token provided" });
//   }
// });

// // Admin middleware
// const admin = (req, res, next) => {
//   console.log("User Role:", req.user?.role); // Debugging line
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     res.status(403).json({ message: "Not authorized as admin" });
//   }
// };


// module.exports = { protect, admin };