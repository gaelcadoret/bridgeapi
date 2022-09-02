const transformer = require("../../../components/transactions/helpers/transformer");
const { transactions } = require("../../../../__mocks__/accounts.json");

const findAccNumber = (accNumber) => (transaction) =>
    transaction.acc_number === accNumber;

/**
 * @param {string} accNumber
 * @return {*} all transaction for specific account number
 */
module.exports = (accNumber) =>
    transformer(transactions).find(findAccNumber(accNumber));
