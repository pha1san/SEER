const fs = require("fs");
const bibtexParse = require("bibtex-parse");

let tdd = bibtexParse.entries(fs.readFileSync("tdd_articles.bib", "utf8"));

console.log(JSON.stringify(tdd));
