const winston = require('winston');
const path = require('path');
const express = require('express');
const csrf = require('csurf'); // Import CSRF middleware

const app = express();
const appDev = express();

// Set up CSRF protection middleware
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);
appDev.use(csrfProtection);

require('./startup/logging')();
require('./startup/routes')(app, appDev);
require('./startup/db')();

const port = process.env.PORT || 3001;
const server = app.listen(port, () => { winston.info(`Listening on port ${port}`) });

module.exports = server;