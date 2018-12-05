const ValidationError = require('../errors/ValidationError');

module.exports = () => {
    return (error, req, res, next) => {
        if(error instanceof Error && error.failedValidation) {
            res.status(400)
            .send({
                status:'400',
                code: error.code,
                title: error.message,
                source: {
                    pointer: `${error.path.join(' > ')}`
                },
                results: error.results
            });
        }
        else {
            let httpStatus = error.statusCode ||(error.status ?  Number(error.status) : 500)
            res.status(httpStatus)
            .send({
                status: httpStatus,
                code: error.code,
                title: error.message,
                meta: error.meta,
                errors: error instanceof ValidationError ? error.getErrors() : undefined,
                stack: error.stack,
                param: error.param
            });
        }
    }
}