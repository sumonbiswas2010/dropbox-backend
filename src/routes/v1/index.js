const express = require('express');
const courseRoute = require('./course.route');
const uploadRoute = require('./upload.route');
const config = require('../../config/config');


const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: courseRoute,
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
