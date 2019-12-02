// Dependencies
// Require Users model
import { User } from '../models/users.model'

export function get(req, res, next) {

  // Grab every document in the Users collection
  User.find({})
    .then(dbUser => {
      // If we were able to successfully find Users, send them back to the client
      res.json(dbUser);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
}

