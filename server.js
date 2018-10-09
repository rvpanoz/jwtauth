import config from "./config";
import Hapi from "hapi";
import mongoose from "mongoose";
import { secret } from "./common/auth";
import { validate } from "./utils/auth";
import { connect } from "./utils/db";
import userRoutes from "./routes/user";

//mongo url to connect
const { url } = config || "";

//setup mongoose promise library
mongoose.Promise = global.Promise;

/**
 * Server instance
 */
const server = new Hapi.Server({
  routes: {
    cors: true
  },
  port: 4001
});

const db = mongoose.connection;

//bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const init = async () => {
  /**
   * MongoDB connection
   */
  connect(url);

  /** */
  /**
   * Register hapi-auth-jwt2 plugin
   */
  await server.register(require("hapi-auth-jwt2"));

  /**
   * Setup jwt auth strategy
   */
  server.auth.strategy("jwt", "jwt", {
    key: secret,
    validate,
    verifyOptions: {
      algorithms: ["HS256"]
    }
  });

  /**
   * Setup routes
   */
  server.route(userRoutes);

  /**
   * Start the server
   */
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();
