const winston = require('winston');
const path = require('path');
const express = require('express');
const app = express();
const appDev = express();
const csrf = require('csurf'); // Import CSRF middleware

require('./startup/logging')();
require('./startup/routes')(app, appDev);
require('./startup/db')();

// Add CSRF middleware
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken(); // Expose CSRF token to templates
  next();
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => { winston.info(`Listening on port ${port}`) });

module.exports = server;