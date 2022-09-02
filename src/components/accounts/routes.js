const { Router } = require("express");

const { accounts } = require("./controllers");

const router = Router();

router.get("/", accounts);

module.exports = router;
