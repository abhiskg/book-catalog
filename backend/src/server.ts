/* eslint-disable no-console */
import type { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

let server: Server;

// uncaught exception error
process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

(async function () {
  try {
    await mongoose.connect(config.mongo_uri, {
      dbName: "cow-hut-admin-with-auth",
    });
    console.log("Database is connected Successfully");

    server = app.listen(config.port, () => {
      console.log(`Application listing on port ${config.port}`);
    });
  } catch (error) {
    console.log("Failed to connect database", error);
  }

  // unhandled rejection error
  process.on("unhandledRejection", () => {
    if (server && server.listening) {
      server.close(() => {
        console.log("Unhandled Rejection Error");
        process.exit(1);
      });
    } else {
      // close the server immediately
      process.exit(1);
    }
  });
})();

// If our server crash suddenly/pm2, to get a signal
process.on("SIGTERM", () => {
  console.log("SIGTERM is received");
  if (server) {
    server.close();
  }
});
