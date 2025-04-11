const winston = require('winston');
const path = require('path');
const express = require('express');
const csrf = require('csurf'); // Import CSRF middleware
const app = express();
const appDev = express();

require('./startup/logging')();
require('./startup/routes')(app, appDev);
require('./startup/db')();

// Add CSRF middleware
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Add CSRF token to response locals
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => { winston.info(`Listening on port ${port}`) });

module.exports = server;