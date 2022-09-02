const { Router } = require("express");

const { transactions } = require("./controllers");

const router = Router();

router.get("/", transactions);

module.exports = router;
