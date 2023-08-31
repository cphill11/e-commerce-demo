// file used to collect and package API routes
const router = require('express').Router();
const userRoutes = require('./user-routes.js');

router.use('./user', userRoutes);

module.exports = router;