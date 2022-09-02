const { hasOwnProperty } = require("../../../../modules/helpers");

const HAS_VALIDATION_ERROR = true;
const VALIDATION_SUCCEEDED = false;

const validateAccountsBody = (body) =>
    !hasOwnProperty(body, "userId")
        ? HAS_VALIDATION_ERROR
        : VALIDATION_SUCCEEDED;

module.exports = validateAccountsBody;
