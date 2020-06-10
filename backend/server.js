const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
