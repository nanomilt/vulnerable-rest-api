const express = require('express');
const { Category } = require('../models/category');
const _ = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

module.exports = router;