const winston = require('winston');

module.exports = function(err) {
  winston.error(err.message, err);
  return 'Server Error';
};