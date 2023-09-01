// CRUD operations
const router = require('express').Router();
const { User } = require('../../models');

// GET / api / users (get all)
router.get('/', (req, res)=> {
    // Access User model & run .findAll() method
    User.findAll({
        // visually protect user's passwords
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET / api / users /1    (find specific)
router.get('/:id', (req, res)=> {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user has been found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST / api / users
router.post('/', (req, res)=> {
    // expects {username: '', email: '', password: ''}
    // .create() inserts data & passes in key expected key values
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then((dbUserData) => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// This route will be found at http://localhost:3001/api/users/login in the browser.
router.post('/login', (req, res) => {
    // expects {username: '', email: '', password: ''}
    // query 1 user's email
    User.findOne({
        where: {
            // assigned 1 user's email to req.body.email
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with this email address' });
            return;
        }
        res.json({ user: dbUserData });
        
        //verify user
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password.' });
            return;
        }
        res.json({ user: dbUserData, message: 'You are now logged in.' });
    });
});

// PUT / api / users /1 to update existing data
router.put('/:id', (req, res)=>{
    // expects {username: '', email: '', password: ''}
    // if req.body has exact key/value pairs to match model, can use `req.body` instead
    User.update(req.body, {
        // pass in req.body instead to only update what's passed through
        individualHooks: true,
        where: {
            id: req.params.id
        }
    }) 
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user has been found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE / api / users /1
router.delete('/:id', (req, res)=>{
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user has been foudn with this id' });
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;