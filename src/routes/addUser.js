// Dependencies
// Require Users model
import { User } from '../models/users.model'

export function post(req, res) {
  //Add a user
  //console.log(req.body);
  
  User.create(req.body)
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        // If an error occurred, send it to the client
        res.send(err);
      });
}

