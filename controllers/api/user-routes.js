// CRUD operations
const router = require('express').Router();
const { User, Post, Vote } = require('../../models');

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
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {
                model: Post,
                attributes: ['title'],
                through: Vote,
                as: 'voted_posts'
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user has been found with this id, hoser'});
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

// use POST not GET (carry request param in body)
router.post('/login', (req, res) => {
    // expects {email: '', password: ''}
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
        
        //verify user **** this throws an error***
        // const validPassword = dbUserData.checkPassword(req.body.password);
        // if (!validPassword) {
        //     res.status(400).json({ message: 'Incorrect password.' });
        //     return;
        // }
        // res.json({ user: dbUserData, message: 'You are now logged in.' });
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