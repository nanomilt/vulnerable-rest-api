const router = require('express').Router();
const path = require('path');

router.get('/', (_req, res) => {
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', 'attachment; filename=logfile.log');
  res.sendFile(path.resolve(`${__dirname }/../logfile.log`));
});

module.exports = router;