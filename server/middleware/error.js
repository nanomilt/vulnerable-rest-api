const winston = require('winston');

module.exports = function(err, res){
  winston.error(err.message, err);
  res.status(500).send('Server Error');
};