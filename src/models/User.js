const mongoose = require('../config/db');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String, 
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
