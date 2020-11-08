const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.isOperational ? err.message : 'Something has gone very wrong!'
    });
}

module.exports = globalErrorHandler;