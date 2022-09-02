const { getTransactionsByAccNumber } = require("../services");
const { successResponse, errorResponse } = require("../../../../modules/helpers");

module.exports = async (req, res) => {
    try {
      // TODO : add validation and security check
      const { acc_number } = req.params;

      return res.status(200).json(
          successResponse({
              data: getTransactionsByAccNumber(acc_number)
          })
      );

    } catch (e) {
      console.error(e.message);

      return res.status(500).json(
          errorResponse("Something get wrong with the request")
      );
    }
};
