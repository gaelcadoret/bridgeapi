const { successResponse, errorResponse } = require("../../../../modules/helpers");

const isValidUser = (user, pwd) => user === "BankinUser" && pwd === "12345678";

module.exports = (user, password) =>
    isValidUser(user, password)
        ? successResponse({ data: "Welcome BankinUser" })
        : errorResponse("Invalid user or password!")
