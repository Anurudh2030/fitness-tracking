const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Check if model already exists to prevent the error
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // other fields...
}, {
  timestamps: true
}));

// Add these as instance methods instead of redefining the model
if (!User.schema.methods.matchPassword) {
  User.schema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
}

// Add pre-save hook if it doesn't exist
if (!User.schema._presave) {
  User.schema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  User.schema._presave = true; // Mark that we've added the pre-save hook
}

module.exports = User;