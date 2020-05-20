const bibtexParse = require('bibtex-parse');
const fs = require('fs');
const bibtex = fs.readFileSync('tdd_articles.bib', 'utf8');
console.log(bibtexParse.entries(bibtex));