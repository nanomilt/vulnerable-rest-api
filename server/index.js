const winston = require('winston');
const path = require('path');
const express = require('express');
const app = express();
const appDev = express();
const csrf = require('csurf'); // Import CSRF middleware

require('./startup/logging')();
require('./startup/routes')(app, appDev);
require('./startup/db')();

// Add CSRF protection middleware
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);
appDev.use(csrfProtection);

// Error handler for CSRF token errors
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  res.status(403).send('CSRF token mismatch');
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => { winston.info(`Listening on port ${port}`) });

module.exports = server;