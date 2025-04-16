const winston = require('winston');

module.exports = function(err, req, res, next){
    const _ = next; // Intentionally unused variable
    winston.error(err.message, err);
    res.status(500).send('Server Error');
}