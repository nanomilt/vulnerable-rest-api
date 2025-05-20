const express = require('express');
const { Author } = require('../models/author');
const auth = require('../middleware/auth');
const _ = require('lodash');
const router = express.Router();

router.get('/', async (_, res) => {
  const authors = await Author.find();
  res.send(authors);
});

router.get('/:id', async (_, res) => {
  const author = await Author.findById({ _id: _.params.id });
  if (!author) {return res.status(404).send('Author Not Found');}
  res.send(author);
});

router.post('/', auth, async (_, res) => {
  let author = await Author.findOne({ email: _.body.email });
  if (author) {return res.status(400).send('Author is Already Existed!');}

  author = new Author(_.body);
  await author.save();
  res.status(201).send(author);
});

router.put('/:id', auth, async (_, res) => {
  await Author.findByIdAndUpdate({ _id: _.params.id }, {
    $set: {
      name: _.body.name,
      email: _.body.email,
      about: _.body.about,
      job: _.body.job,
    },
  });

  res.send('Updated Successfully');
});

router.delete('/:id', auth, async (_, res) => {
  const author = await Author.findByIdAndRemove({ _id: _.params.id });
  if (!author) {return res.status(404).send('The author with the given ID was not found');}

  res.send(author);
});

module.exports = router;