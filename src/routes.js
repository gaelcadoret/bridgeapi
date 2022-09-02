const { Router } = require("express");

const login = require("./components/login/routes");
const accounts = require("./components/accounts/routes");
const transactions = require("./components/transactions/routes");

const { errorResponse } = require("../modules/helpers");

module.exports = (app) => {
  const router = Router({ mergeParams: true });

  app.get("/healthz", (req, res) => {
    return res.json({
      success: true,
      data: "Welcome to this awesome api.",
      timestamp: Date.now()
    });
  });

  router.use("/login", login);
  router.use("/accounts", accounts);
  router.use("/transactions", transactions);

  app.use("/", router);

  router.all("*", (req, res) => {
    return res.status(404).json(errorResponse(`${req.originalUrl} can't be found !`));
  });
};
