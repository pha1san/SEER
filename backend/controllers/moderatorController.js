const Moderator = require("../models/moderatorModel");
const bibtexParse = require("bibtex-parse");
const fs = require("fs");

exports.moderator = async (req, res, next) => {
    await Moderator.find()
        .then((moderator) => res.json(moderator))
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.addModerator = async (req, res, next) => {
    const newModerator = new Moderator(req.body);
    await newModerator
        .save()
        .then(() => res.json("Entry added to Moderator Queue!"))
        .catch((err) => res.status(400).json("Error: " + err));
};

//fix bug later, make id of article correspond properly
exports.delete = async (req, res, next) => {
    await Moderator.findByIdAndDelete(req.params.id)
        .then((moderator) => {
            if (moderator === null) {
                res.status(400).json("Error: " + req.params.id + " does not exist");
            } else {
                res.json(moderator);
            }
        })
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.getModerator = async (req, res, next) => {
    await Moderator.findById(req.params.id)
        .then((moderator) => res.json(moderator))
        .catch((err) => res.status(400).json("Error: " + err));
};