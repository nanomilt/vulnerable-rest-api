const express = require('express');
const { Category } = require('../models/category');
const _ = require('../middleware/auth');
const router = express.Router();

router.get('/', async (_, res) => {
  const categories = await Category.find();
  res.send(categories);
});

module.exports = router;