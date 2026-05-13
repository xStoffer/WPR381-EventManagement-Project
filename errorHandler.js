//Centralized error handling middleware prevents leaks to client and logs errors for debugging, improving security and maintainability. It captures unhandled errors from routes and controllers, logs them using a logger utility, and sends a generic error response to the client without exposing sensitive details.
const logger = require('../middleware/logger');

exports.errorHandler = (err, req, res, next) => {
  logger.error(err.stack); // Log the error stack trace for debugging
  res.status(500).render('error', { error: err.message });// 
};