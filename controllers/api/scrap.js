// from user-routes.js

// use POST not GET (carry request param in body to improve security)
router.post('/login', (req, res) => {
    // expects {email: '', password: ''}
    User.findOne({
      where: {
        // assigned 1 user's email to req.body.email
        email: req.body.email,
      },
    }).then((dbUserData) => {
      if (!dbUserData) {
        res.status(500);
        return;
      }
      res.json({ user: dbUserData });
  
       // verify user
      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(500);
        return;
      }
        res.json({ user: dbUserData, message: "You are now logged in." });
    });
  });