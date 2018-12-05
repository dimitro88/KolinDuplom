class UnauthorizedError extends Error {
  constructor(message = null) {
      super();
      this.status = '401';
      this.code = 'UNAUTHORIZED';
      this.message = message ? message : "Не коректні дані для авторизації."
  }
};
module.exports = UnauthorizedError;