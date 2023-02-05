// const { Sequelize } = require('sequelize');
// const logger = require('./logger');
// const config = require('./config');

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect:'mysql',
//   dialectModule: require('mysql2'),
//   // logging: (...msg) => console.log(msg)
//   logging: false,
// });

// if (config.env !== 'test') {
//   sequelize
//     .authenticate()
//     .then(() => logger.info('Connected to Database server'))
//     .catch((error) => logger.warn(`Unable to connect to database server. Error: ${error}`));
// }
// module.exports = sequelize;
