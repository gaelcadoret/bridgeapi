const { hasOwnProperty } = require("../../../../modules/helpers");

const HAS_VALIDATION_ERROR = true;
const VALIDATION_SUCCEEDED = false;

const validateLoginBody = (body) =>
    !hasOwnProperty(body, "user") || !hasOwnProperty(body, "password")
        ? HAS_VALIDATION_ERROR
        : VALIDATION_SUCCEEDED;

module.exports = validateLoginBody;
