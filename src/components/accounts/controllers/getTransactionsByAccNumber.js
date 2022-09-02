const { getTransactionsByAccNumber } = require("../services");
const { successResponse, errorResponse } = require("../../../../modules/helpers");
const { validateAccountsBody } = require("../validators");

module.exports = async (req, res) => {
    try {
      // const hasValidationError = validateAccountsBody(req.body);

      // if (hasValidationError) {
      //   return res.status(400).json(errorResponse("Something get wrong with the request"));
      // }

      const { acc_number } = req.params;

      return res.status(200).json(successResponse({ data: getTransactionsByAccNumber(acc_number) }));

    } catch (e) {
      console.error(e.message);

      return res.status(500).json(errorResponse("Something get wrong with the request"));
    }
};
