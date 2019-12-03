// Dependencies
// Require Users model
import { User } from '../models/users.model'

export function get(req, res) {
  // Grab every document in the Users collection
  User.find({})
    .then(dbUser => {
      // If we were able to successfully find Users, send them back to the client
      res.send(dbUser);
      //res.json(dbUser);
      //res.end(dbUser);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.send(err);
      //res.json(dbUser);
      //res.end(err);
    });
}

