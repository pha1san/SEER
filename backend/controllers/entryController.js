const Entry = require("../models/entryModel");
const bibtexParse = require("bibtex-parse");
const fs = require("fs");

exports.entries = async (req, res, next) => {
  await Entry.find()
    .then((entries) => res.json(entries))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.addEntry = async (req, res, next) => {
  const newEntry = new Entry(req.body);
  await newEntry
    .save()
    .then(() => res.json("Entry added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.addTDD = (req, res, next) => {
  let tdd = bibtexParse.entries(fs.readFileSync("tdd_articles.bib", "utf8"));

  tdd.forEach(async (tdd) => {
    const newEntry = new Entry(tdd);
    await newEntry
      .save()
      .then(() => res.json("Entry added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
};

exports.getEntry = async (req, res, next) => {
  await Entry.findById(req.params.id)
    .then((entry) => res.json(entry))
    .catch((err) => res.status(400).json("Error: " + err));
};

// //need more work
exports.searchTitle = async (req, res, next) => {
  const text = req.body.text.trim();
  await Entry.find({ title: { $regex: text, $options: "i" } })
    .then((entries) => {
      res.json(entries);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.searchAuthor = async (req, res, next) => {
  const text = req.body.text.trim();
  await Entry.find({ author: { $regex: text, $options: "i" } })
    .then((entries) => {
      res.json(entries);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

//fix bug later, make id of article correspond properly
exports.delete = async (req, res, next) => {
  await Entry.findByIdAndDelete(req.params.id)
    .then((entries) => {
      if (entries === null) {
        res.status(400).json("Error: " + req.params.id + " is not exist");
      } else {
        res.json(entries);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// router.route("/search").get((req, res) => {
//   const text = req.query.q;
//   Entry.find({ title: { $regex: text, $options: "i" } })
//     .then((entries) => {
//       res.json(entries);
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });
