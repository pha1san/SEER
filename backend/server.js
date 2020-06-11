const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const login = require("../routes/loginroutes");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/*
The next lines of code relate to the login function
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function(res, req, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

var router = express.Router();

// test route
router.get("/", function(req, res) {
  res.json({ message: "welcome to our upload module apis"});
});

// route to handle user registration
router.post("/register", login.register);
router.post("/login", login.login);
app.use("/api", router);
app.listen(4000);
/*
This is the end of the first part of the login
*/

const uri = process.env.ATLAS_URI || "mongodb://localhost:27017/seer";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//routing
const usersRouter = require("./routes/users");
const entriesRouter = require("./routes/entries");

app.use("/users", usersRouter);
app.use("/entries", entriesRouter);

//Deploy react static
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html")); // relative path
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
