class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    console.log("🚀 ~ ApiError ~ constructor ~ statusCode:", statusCode)
    super(message);
    let code
    if (statusCode = 401) {
      code = 200
    }
    else {
      code = 200
    }

    this.statusCode = code;
    this.isOperational = isOperational;
    this.error = true;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;


// abcdefghijklmnopqrstuvwxyz
// 12345678901234567890123456