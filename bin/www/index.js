#!/usr/bin/env node
const http = require("http");

const initApp = require("../../src");
const { PORT } = require("../../config/env");

const TIMEOUT = 25 * 1000;
const LISTEN = "listen";
const EACCES = "EACCES";
const EADDRINUSE = "EADDRINUSE";

(async () => {
  /**
   * Get PORT from environment and store in Express.
   */
  const app = await initApp();

  app.set("port", PORT);

  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);

  const getBind = (addr) =>
    typeof addr === "string" ? `Pipe ${addr}` : `Port ${addr.port || addr}`;

  const exitProcess = (message, code) => {
    console.warn(message);
    process.exit(code);
  };

  const forceProcessKill = (code) => {
    setTimeout(() => {
      console.warn(
        "Could not close connections in time, forcefully shutting down!",
      );
      process.exit(code);
    }, TIMEOUT);
  };

  /**
   * Event listener for HTTP server "error" event.
   */
  const onError = (bind) => (error) => {
    if (error.syscall !== LISTEN) {
      throw error;
    }

    switch (error.code) {
      case EACCES:
        exitProcess(`${bind(PORT)} requires elevated privileges`, 1);
        break;
      case EADDRINUSE:
        exitProcess(`${bind(PORT)} is already in use`, 1);
        break;
      default:
        throw error;
    }
  };

  /**
   * Event listener for HTTP server "listening" event.
   */
  const onListening = (bind) => () => {
    const addr = server.address();

    console.info(`Listening on ${bind(addr)}`);
  };

  const onProcessTrouble =
    (eventName, bind) =>
    ({ name, message }) => {
      console.error(`${eventName} - Shutting down the app on ${bind(PORT)}`);

      server.close(() => exitProcess(`${name} : ${message}`, 1));

      forceProcessKill(1);
    };

  // Event listener responding to a SIGTERM signal
  const onExitEvent = (bind, exitEvent) => () => {
    const code = exitEvent === "SIGTERM" ? 0 : 1;

    console.info(
      `${exitEvent} RECEIVED - Shutting down the app gracefully on ${bind(
        PORT,
      )}`,
    );

    server.close(() => exitProcess("Process terminated !", code));

    forceProcessKill(code);
  };

  server.on("error", onError(getBind));
  server.on("listening", onListening(getBind));

  /**
   * Listen on provided PORT, on all network interfaces.
   */
  server.listen(PORT);

  // Event listener when their is an handled rejection
  process.on(
    "unhandledRejection",
    onProcessTrouble("UNHANDLED REJECTION", getBind),
  );
  // Event listener when an exception is not handle. Of course, every thing should be catch,
  // if not it will terminated the app for precaution
  process.on(
    "uncaughtException",
    onProcessTrouble("UNCAUGHT EXCEPTION", getBind),
  );
  process.on("SIGTERM", onExitEvent(getBind, "SIGTERM"));
  process.on("SIGINT", onExitEvent(getBind, "SIGINT"));
})();
