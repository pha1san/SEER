const bibtexParse = require('bibtex-parse');
const fs = require('fs');
const bibtex = fs.readFileSync('example.bib', 'utf8');
bibtexParse.entries(bibtex);