const { Entry, Analyst } = require("../models/entryModel");
const mongoose = require("mongoose");

exports.analyst = async (req, res, next) => {
  await Analyst.find()
    .then((analyst) => res.json(analyst))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.addAnalyst = async (req, res, next) => {
  const newAnalyst = new Analyst(req.body);
  await newAnalyst
    .save()
    .then(() => res.json("Entry added to Analyst Queue!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.getAnalyst = async (req, res, next) => {
  await Analyst.findById(req.params.id)
    .then((entry) => res.json(entry))
    .catch((err) => res.status(400).json("Error: " + err));
};

//fix bug later, make id of article correspond properly
exports.delete = async (req, res, next) => {
  await Analyst.findByIdAndDelete(req.params.id)
    .then((analyst) => {
      if (analyst === null) {
        res.status(400).json("Error: " + req.params.id + " does not exist");
      } else {
        res.json(analyst);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.moveToEntry = async (req, res, next) => {
  await Analyst.findById(req.body.id)
    .then((analyst) => {
      let entry = new Entry(analyst);
      entry._id = mongoose.Types.ObjectId();
      entry.isNew = true;
      entry
        .save()
        .then(() => {
          analyst.remove();
          res.json("Moved to Artile list!");
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
