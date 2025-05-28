const winston = require('winston');

module.exports = function(err, _, __) {
  winston.error(err.message, err);
  __.status(500).send('Server Error');
};