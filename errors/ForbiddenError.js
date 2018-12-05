module.exports = class ForbiddenError extends Error {
    constructor(message = null) {
        super();
        this.status = '403';
        this.code = 'FORBIDDEN';
        this.message = message;
    }
};