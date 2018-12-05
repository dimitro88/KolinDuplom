module.exports = class ForbiddenError extends Error {
    constructor(message = null) {
        super();
        this.status = '400';
        this.code = 'Custom error';
        this.message = message;
    }
};