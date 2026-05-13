// middleware/logger.js
const { createLogger, format, transports } = require('winston');

// The Winston logger instance — used internally by the middleware below
const winstonLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
});

// Express middleware wrapper — this is what app.use() actually calls
const requestLogger = (req, res, next) => {
  winstonLogger.info({
    method: req.method,
    url: req.originalUrl,
    ip: req.ip
  });
  next(); // <-- this is what was missing before
};

module.exports = { requestLogger, logger: winstonLogger };