const AppError = require('./appError');

// IMPLEMENT PRODUCTION VS DEVELOPMENT ERRORS LATER
// const sendError = (err, res) => {
//   if (err.isOperational) {
//     res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message,
//     });
//   } else {
//     // DO NOT LEAK SERVER DETAILS
//     console.log('ERROR 💥', err);
//     res.status(500).json({
//       status: 'error',
//       message: 'Something went very wrong',
//     });
//   }
// }
const sendError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    // Fields below are to be excluded from error output when live
    stack: err.stack,
    err,
  });
};

const handleDuplicateDB = (err) => {
  console.log(err);
  const [val] = Object.entries(err.keyValue).at(0);
  const message = `${val} already exist. `;
  return new AppError(302, message);
};
const handleJWTError = () => new AppError(401, 'Invalid token');

// const handleJWTExpiredError = () =>
//   new AppError('Your token has expired, Please login again', 401);

module.exports = (err, req, res, next) => {
  // Error produce by some module which doesn't have code or status
  err.status ||= 'error';
  err.statusCode ||= 500;

  // CURRENTLY NOT SET UP
  if (err.code === 11000) err = handleDuplicateDB(err);

  if (err.name === 'JsonWebTokenError') err = handleJWTError();

  // if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

  sendError(err, res);
};
