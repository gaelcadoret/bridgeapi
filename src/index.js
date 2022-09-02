if (process.env.NODE_ENV === "production") {
  // add instana agent here on top of the file
  console.info("Production environment...");
}

const express = require("express");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");

const router = require("./routes");

module.exports = async () => {
  const app = express();

  app.use(helmet());
  app.use(compression());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  router(app);
  return app;
};
