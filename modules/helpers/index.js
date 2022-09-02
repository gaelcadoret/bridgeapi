const errorResponse = (msg) => ({
    success: false,
    error: msg,
    timestamp: Date.now(),
});

const successResponse = (data) => ({
    success: true,
    ...data,
    timestamp: Date.now(),
});

const hasError = (data) => !data?.success;

const hasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

module.exports = {
    errorResponse,
    successResponse,
    hasError,
    hasOwnProperty,
}
