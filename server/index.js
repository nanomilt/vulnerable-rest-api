const winston = require('winston');
const path = require('path');
const express = require('express');
const app = express();
const appDev = express();
const csrf = require('csurf'); // Import CSRF middleware
const csrfProtection = csrf({ cookie: true }); // Initialize CSRF protection

require('./startup/logging')();
require('./startup/routes')(app, appDev);
require('./startup/db')();

// Apply CSRF protection middleware to all routes
app.use(csrfProtection);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => { winston.info(`Listening on port ${port}`) });

module.exports = server;