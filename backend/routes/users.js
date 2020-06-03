const router = require("express").Router();
let User = require("../models/userModel");

// This method returns the list of users in the database.
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// This method adds a user and saves it in the database.
router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//This method returns a specific user using its id.
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// This method searches for the id and deletes the user.
router.route('/:id').delete((req,res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
}); 

// This method updates an existing user after searching for its id.
router.route('/update/:id').post((rew, res) => {
  User.findById(req.params.id)
    .then(users => {
      users.username = req.body.username;

      users.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
