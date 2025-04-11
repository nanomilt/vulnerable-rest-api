const winston = require('winston');
const path = require('path');
const express = require('express');
const csrf = require('csurf'); // Added CSRF protection middleware

const app = express();
const appDev = express();

// CSRF protection middleware for app
app.use(csrf({ cookie: true }));

// CSRF protection middleware for appDev
appDev.use(csrf({ cookie: true }));

require('./startup/logging')();
require('./startup/routes')(app, appDev);
require('./startup/db')();

const port = process.env.PORT || 3001;
const server = app.listen(port, () => { winston.info(`Listening on port ${port}`) });

module.exports = server;