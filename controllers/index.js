// collect packaged api routes from routes/api/index.js

const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// produces an error if request an endpoint that doesn't exit (incorrect resources)
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;