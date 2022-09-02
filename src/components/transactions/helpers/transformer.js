const DEBIT = "DBT";
const CREDIT = "CDT";

/**
 *
 * @param {number} transactionId
 * @return {function(*): boolean}
 */
const findTransactionById = (transactionId) => (transaction) => transaction.id === transactionId;

/**
 *
 * @param {array} deduplicatedTransactions
 * @param {number} transactionId
 * @return {*}
 */
const isTransactionAlreadyExists = (deduplicatedTransactions, transactionId) =>
    deduplicatedTransactions.find(findTransactionById(transactionId));

/**
 *
 * @param {array} transactions
 */
const deduplicateTransactionsById = (transactions) =>
    transactions.reduce((deduplicatedTransactions, transaction) =>
        !isTransactionAlreadyExists(deduplicatedTransactions, transaction.id)
            ? [
                ...deduplicatedTransactions,
                transaction
            ]
            : [
                ...deduplicatedTransactions,
            ], []);

/**
 *
 * @param {string} accountNumber
 * @param {array} deduplicatedTransactions
 */
const deduplicateTransactionByAccNumberAndTransactionId = (accountNumber, deduplicatedTransactions) =>
    deduplicatedTransactions.reduce((acc, { id, label, sign, amount, currency })=> {

        const accountTransactionKey = `${accountNumber}_${id}`;

        return !acc.hasOwnProperty(accountTransactionKey)
            ? {
                ...acc,
                [accountTransactionKey]: {
                    label,
                    sign,
                    amount: Number(amount),
                    currency,
                }
            }
            : {
                ...acc,
            }
    }, {});

/**
 *
 * @param {string} accountNumber
 * @param {array} accountRecords
 * @return {object}
 */
const amountReducer = (accountNumber, accountRecords) => Object.entries(accountRecords)
    .reduce((acc, [key, transactions]) => {
        const deduplicatedTransactions = deduplicateTransactionsById(transactions);

        return {
            ...acc,
            ...deduplicateTransactionByAccNumberAndTransactionId(accountNumber, deduplicatedTransactions),
        };
    }, {});

/**
 *
 * @param {number} acc
 * @param _
 * @param {object} transaction
 * @return {number|*}
 */
const computeAmount = (acc, [_, transaction]) => {
    const { sign, amount } = transaction;

    if(sign === DEBIT) {
        return acc - Number(amount);
    }

    if(sign === CREDIT) {
        return acc + Number(amount);
    }
};

/**
 *
 * @param {string} acc_number
 * @param {array} accountRecords
 * @return {string} - Stringified amount.
 */
const calcAmount = (acc_number, accountRecords) => {
    const deDuplicatedTransactions = amountReducer(acc_number, accountRecords);

    return Object.entries(deDuplicatedTransactions)
        .reduce(computeAmount, 0)
        .toString();
}

/**
 *
 * @param {string} sign - DBT or CDT
 * @param {string} amount
 * @return {string}
 */
const formatAmount = (sign, amount) => {
    if(sign === DEBIT) {
        return `-${Number(amount)}`;
    }

    if(sign === CREDIT) {
        return `${Number(amount)}`;
    }
};

const formatSingleTransaction = ({ label, sign, amount, currency }) => ({
    label,
    amount: formatAmount(sign, amount),
    currency,
});

const formatTransactionReducer = (acc, [_, transaction]) => [
    ...acc,
    formatSingleTransaction(transaction),
];

/**
 *
 * @param {string} acc_number
 * @param {array} accountRecords
 * @return {[string, unknown]}
 */
const getDeduplicatedTransactions = (acc_number, accountRecords) => {
    const deDuplicatedTransactions = amountReducer(acc_number, accountRecords);

    return Object.entries(deDuplicatedTransactions)
        .reduce(formatTransactionReducer, []);
};

/**
 * @param {string} acc_number
 * @param {array} accountRecords
 * @return {[{acc_number, amount, transactions}]}
 */
const getAccountInfos = (acc_number, accountRecords) => [{
    acc_number,
    amount: calcAmount(acc_number, accountRecords),
    transactions: getDeduplicatedTransactions(acc_number, accountRecords),
}];

/**
 *
 * @param {object} transactions
 * @return {*[]}
 */
const transformer = (transactions) =>
    Object.entries(transactions)
        .reduce((acc, [accountNumber, accountRecords]) => {
            return [
                ...acc,
                ...getAccountInfos(accountNumber, accountRecords),
            ]
        }, []);

module.exports = transformer;
