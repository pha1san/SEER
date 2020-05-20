const router = require('express').Router();
let Entry = require('../models/entry.model');

router.route('/').get((req, res) => {
  Entry.find()
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const type = req.body.type;
  const key = req.body.key;
  const title = req.body.title;
  const author = req.body.author;
  const journal = req.body.journal;
  const pages = req.body.pages;
  const volume = req.body.volume;
  const annote = req.body.annote;
  const publisher = req.body.publisher;
  const method = req.body.method;
  const participants = req.body.participants;
  const year = req.body.year;
  const month = req.body.month;

  const newEntry = new Entry({
    type,
    key,
    title,
    author,
    journal,
    pages,
    volume,
    annote,
    publisher,
    method,
    participants,
    year,
    month,
  });

  newEntry.save()
    .then(() => res.json('Entry added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

/* Content from exercises.js, we don't need it at the moment but if we do we can repurpose it for entries.js
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
*/

module.exports = router;