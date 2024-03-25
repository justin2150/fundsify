class AppError extends Error {
  constructor(statusCode, msg) {
    super(msg);

    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith('3')
      ? 'moved permanently'
      : `${statusCode}`.startsWith('4')
      ? 'fail'
      : 'else';
    this.isOperational = true;
    this.message = msg;
  }
}

module.exports = AppError;
