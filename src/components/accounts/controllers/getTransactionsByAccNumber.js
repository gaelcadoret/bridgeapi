const { getTransactionsByAccNumber } = require("../services");
const { successResponse, errorResponse } = require("../../../../modules/helpers");

module.exports = async (req, res) => {
    try {
      // TODO : add validation and security check
      const { acc_number } = req.params;

      const transactionsByAccNumber = getTransactionsByAccNumber(acc_number);

      return transactionsByAccNumber
        ? res.status(200).json(
              successResponse({
                  data: transactionsByAccNumber
              })
          )
        : res.status(404).json(
              errorResponse("No transactions have been found for this account number!")
          );

    } catch (e) {
      console.error(e.message);

      return res.status(500).json(
          errorResponse("Something get wrong with the request")
      );
    }
};
