const winston = require('winston');
const path = require('path');
const express = require('express');
const app = express();
const appDev = express();
const csrf = require('csurf'); // Import the CSRF middleware

require('./startup/logging')();
require('./startup/routes')(app, appDev);
require('./startup/db')();

// Enable CSRF protection for all routes
app.use(csrf());

const port = process.env.PORT || 3001;
const server = app.listen(port, () => { winston.info(`Listening on port ${port}`) });

module.exports = server;