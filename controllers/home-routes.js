const router = require('express').Router();


router.get('/', (req, res) => {
    // able to use res.render b/c template engine is hooked up
    res.render('homepage');
});

module.exports = router;