const { login } = require("../services");
const { hasError, successResponse, errorResponse } = require("../../../../modules/helpers");
const { validateLoginBody } = require("../validators");

module.exports = async (req, res) => {
    try {
      const hasValidationError = validateLoginBody(req.body);

      if (hasValidationError) {
        return res.status(400).json(errorResponse("Something get wrong with the request"));
      }

      const { user, password } = req.body;

      const responseLogin = login(user, password);

      if (hasError(responseLogin)) {
        // console.error(JSON.stringify(responseLogin));

        return res.status(401).json(errorResponse("401 Unauthorized"));
      }

      return res.status(200).json(successResponse({ message: "Login has been succeeded" }));

    } catch (e) {
      console.error(e.message);

      return res.status(500).json(errorResponse("Something get wrong with the request"));
    }
};
