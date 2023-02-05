const mongoose = require('../config/db');
const { Schema } = mongoose;

const authTokenSchema = new Schema({
  expire: Date,
  refresh_token: String, 
  access_token: String,
  user_id: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const AuthToken = mongoose.model('AuthToken', authTokenSchema);

module.exports = AuthToken;
