const bibtexParse = require('bibtex-parse');
const fs = require('fs');
let tdd = bibtexParse.entries(fs.readFileSync('tdd_articles.bib', 'utf8'));

tdd.forEach((tdd) => {
    console.log(tdd.title);
});

console.log(tdd.length);


// let myModule = require('./models/entry.model');
// let Entry = myModule.entry;
// let otherMethod = myModule.otherMethod;

// const fs = require('fs');
// const bibtex = fs.readFileSync('tdd_articles.bib', 'utf8');
// let req = bibtexParse.entries(bibtex);

// console.log(req);

// const newEntry = new Entry(req);

// const type = req.body.type;
// const key = req.body.key;
// const title = req.body.title;
// const author = req.body.author;
// const journal = req.body.journal;
// const pages = req.body.pages;
// const volume = req.body.volume;
// const annote = req.body.annote;
// const publisher = req.body.publisher;
// const method = req.body.method;
// const participants = req.body.participants;
// const year = req.body.year;
// const month = req.body.month;

// const newEntry = new Entry({
//     type, key, title, author,
//     journal,
//     pages, volume,
//     annote,
//     publisher,
//     method,
//     participants,
//     year, month,
// });

// console.log(newEntry);
// console.log(otherMethod);

// var authorModel = mongoose.model('authorModel', newEntry); 

// newEntry.find(function (err, result) {
//     console.log(result)
// });
