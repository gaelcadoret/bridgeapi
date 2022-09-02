const { getTransactions } = require("../services");
const { successResponse, errorResponse } = require("../../../../modules/helpers");
const { validateTransactionsBody } = require("../validators");

module.exports = async (req, res) => {
    try {
      const hasValidationError = validateTransactionsBody(req.body);

      if (hasValidationError) {
        return res.status(400).json(errorResponse("Something get wrong with the request"));
      }

      const { userId } = req.body;

      return res.status(200).json(successResponse({ data: getTransactions(userId) }));

    } catch (e) {
      console.error(e.message);

      return res.status(500).json(errorResponse("Something get wrong with the request"));
    }
};
