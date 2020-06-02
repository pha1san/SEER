// This js file connects the system to the Mongo DB server.
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// The routers need to be initialised uby turning them to variables.
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
const entriesRouter = require("./routes/entries");

// This allows the server to use the routers.
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
app.use("/entries", entriesRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html")); // relative path
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
