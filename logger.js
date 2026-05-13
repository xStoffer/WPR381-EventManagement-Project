// middleware/logger.js
const {createLogger, format, transports} = require('winston');

//Making use of winston for logger configuration
module.exports = createLogger({
  level: 'info', //default log level
  format: format.combine(
    format.timestamp(), //add timestamps to each log entry
    format.json()//structured output
    ),
    transports: [
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/combined.log' })
    ]
});