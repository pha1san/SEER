const router = require("express").Router();
const userController = require("../controllers/userController.js");
let User = require("../models/userModel");

/*
router.get("/", userController.users);

router.route("/signup/").post(userController.signup);

router.route("/login/").post(userController.login);

router.route("/updateUser").post(userController.updateUser);

router.route("/deleteUser/id").post(userController.updateUser);

router.route("/")
*/
// router.route("/").get((req, res) => {
//   User.find()
//     .then((users) => res.json(users))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/add").post((req, res) => {
//   const username = req.body.username;

//   const newUser = new User({ username });

//   newUser
//     .save()
//     .then(() => res.json("User added!"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

module.exports = router;
