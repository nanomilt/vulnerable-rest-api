const express = require('express');
const auth = require('../middleware/auth');
const { Book } = require('../models/book');
const router = express.Router();

router.get('/', async (_, res) => {
  const books = await Book.find().populate('author', 'name email phoneNumber').populate('category', 'name -_id');
  res.send(books);
});

router.get('/:id', async (_, res) => {
  const book = await Book.findById({ _id: _.params.id }).populate('author', 'name email phoneNumber -_id').populate('category', 'name -_id');
  res.send(book);
});

router.post('/', auth, async (_, res) => {
  const book = new Book(_.body);
  await book.save();
  res.status(201).send(book);
});

router.put('/:id', auth, async (_, res) => {
  const book = await Book.findByIdAndUpdate({ _id: _.params.id }, {
    $set: {
      title: _.body.title,
      category: _.body.category,
      publishedDate: _.body.publishedDate,
      author: _.body.author,
    },
  }, { new: true });

  res.send(book);
});

router.delete('/:id', auth, async (_, res) => {
  const book = await Book.findByIdAndRemove(_.params.id);
  if (!book) {return res.status(404).send('The book with the given ID was not found');}

  res.send(book);
});

module.exports = router;