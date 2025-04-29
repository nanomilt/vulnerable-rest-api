const winston = require('winston');

module.exports = function(err, req, res, next){
    const _ = next; // Unused variable declared to avoid linting error
    winston.error(err.message, err);
    res.status(500).send('Server Error');
}