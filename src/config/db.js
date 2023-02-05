const mongoose = require('mongoose');
const logger = require('./logger')
// mongoose.connect(process.env.DB);
console.log(process.env.DB);
mongoose
  .connect(process.env.DB, {})
  .then(() => logger.info(`MongoDB Connected`))
  .catch((err) => console.log(err));
module.exports = mongoose;
