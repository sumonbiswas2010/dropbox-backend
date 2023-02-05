const express = require('express');
const customerRoute = require('./customer.route');
const uploadRoute = require('./upload.route');
const config = require('../../config/config');


const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: customerRoute,
  },
  {
    path: '/upload',
    route: uploadRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  // devRoutes.forEach((route) => {
  //   router.use(route.path, route.route);
  // });
}

module.exports = router;
