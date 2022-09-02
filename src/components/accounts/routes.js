const { Router } = require("express");

const { accounts, getTransactionsByAccNumber } = require("./controllers");

const router = Router();

router.get("/", accounts);
router.get("/:acc_number/transactions", getTransactionsByAccNumber);

module.exports = router;
