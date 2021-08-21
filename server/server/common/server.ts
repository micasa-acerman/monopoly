import express from "express";
import { Application } from "express";
import path from "path";
import http from "http";
import os from "os";
import cookieParser from "cookie-parser";
import l from "./logger";
import morgan from "morgan";
import { IDatabase } from "./database";
import errorHandler from "../api/middlewares/error.handler";
import * as OpenApiValidator from "express-openapi-validator";
import { passportInitialize } from "../config/passport.config";
import passport from "passport";

const app = express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(__dirname + "/../..");
    app.set("appPath", root + "client");
    app.use(morgan("dev"));
    app.use(express.json({ limit: process.env.REQUEST_LIMIT || "100kb" }));
    app.use(
      express.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || "100kb",
      })
    );
    // app.use(
    //   session({
    //     secret: process.env.SESSION_SECRET,
    //     store: FileStore,
    //     cookie: {
    //       path: "/",
    //       httpOnly: true,
    //       maxAge: 60 * 60 * 1000,
    //     },
    //     resave: false,
    //     saveUninitialized: false,
    //   })
    // );
    app.use(express.text({ limit: process.env.REQUEST_LIMIT || "100kb" }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
    passportInitialize(app);
    // const apiSpec = path.join(__dirname, "api.yml");
    // const validateResponses = !!(
    //   process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === "true"
    // );
    // app.use(process.env.OPENAPI_SPEC || "/spec", express.static(apiSpec));
    // app.use(
    //   OpenApiValidator.middleware({
    //     apiSpec,
    //     validateResponses,
    //     ignorePaths: /.*\/spec(\/|$)/,
    //   })
    // );
  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(app);
    app.use(errorHandler);
    return this;
  }

  database(db: IDatabase): ExpressServer {
    db.init();
    return this;
  }

  listen(port: number): Application {
    const welcome = (p: number) => (): void =>
      l.info(
        `up and running in ${
          process.env.NODE_ENV || "development"
        } @: ${os.hostname()} on port: ${p}}`
      );

    http.createServer(app).listen(port, welcome(port));

    return app;
  }
}
