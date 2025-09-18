const path = require('path');
const csrf = require('csurf');
const winston = require('winston');
const express = require('express');
const app = express();
const appDev = express();

// Add CSRF protection middleware
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);
appDev.use(csrfProtection);

require('./startup/logging')();
require('./startup/routes')(app, appDev);
require('./startup/db')();

const port = process.env.PORT || 3001;
const server = app.listen(port, () => { winston.info(`Listening on port ${port}`); });

module.exports = server;