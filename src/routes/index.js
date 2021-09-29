const express = require('express');
const firefighterRoute = require('./firefighter.route');

const router = express.Router();

const routes = [
  {
    path: '/firefighter',
    route: firefighterRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
