const mongoose = require('../config/db');
const { Schema } = mongoose;

const fileSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  user_id: String,
  key: String,
  fileType: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  hidden: Boolean,
  location: String,
  isStarred: { type: Boolean, default: 'false' },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
