const { transactions } = require("../../../../__mocks__/accounts.json");

const transformer = require("../helpers/transformer");

module.exports = (userId) => transformer(transactions);
