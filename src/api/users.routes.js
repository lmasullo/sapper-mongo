// Dependencies
const router = require('express').Router();
//const authCheck = require('../Utils/authCheck');

// Require Users model
const db = require('../models/users.model');

// Route for getting all the Users from the db
// localhost:4000/user/
// authCheck uses authCheck.js in Utils folder to check for req.user to ensure user is logged in
router.get('/', (req, res, next) => {
  // Grab every document in the Users collection
  db.User.find({})
    .then(dbUser => {
      // If we were able to successfully find Users, send them back to the client
      res.json(dbUser);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Export the routes
module.exports = router;
