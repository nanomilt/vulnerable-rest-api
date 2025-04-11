const winston = require('winston');
const path = require('path');
const express = require('express');
const csrf = require('csurf');
const app = express();
const appDev = express();

require('./startup/logging')();
require('./startup/routes')(app, appDev);
require('./startup/db')();

const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  res.status(403).send('CSRF Token Invalid');
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => { winston.info(`Listening on port ${port}`) });

module.exports = server;