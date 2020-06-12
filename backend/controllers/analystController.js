const Analyst = require("../models/moderatorModel");
const bibtexParse = require("bibtex-parse");
const fs = require("fs");

exports.analyst = async (req, res, next) => {
    await Analyst.find()
        .then((analyst) => res.json(analyst))
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

exports.getAnalyst = async (req, res, next) => {
    await Analyst.findById(req.params.id)
        .then((entry) => res.json(entry))
        .catch((err) => res.status(400).json("Error: " + err));
};