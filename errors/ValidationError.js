class ValidationError extends Error {
    constructor(validator) {
        super();
        this.statusCode = 400;
        this.name = 'ValidationError';
        this.message = 'Validaion errors';
        this.validator = validator;
    }
    getErrors(){
        return this.validator.getErrors();
    }
}

module.exports = ValidationError;