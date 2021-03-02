// databases/create-connections-db.ts

/**
 * This file initializes the connections to the db(s)
 */

import { createConnection } from "typeorm";
import { tables } from "./tables-db";
import fs = require("fs");

export const postgresDB = async () => {
  return await createConnection({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: "analyticswk",
    password: "analyticspasswordkarasu",
    database: "analyticsdb",
    entities: tables,
    logging:
      process.env.ACTIVATE_LOG_QUERIES === "true"
        ? ["query", "error"]
        : ["error"],
    synchronize: true,
  })
    .then(_connection => {
      console.log(`Connected to ${process.env.NODE_ENV} Database !`);
      return _connection;
    })
    .catch((error: any) => {
      console.error(error);
    });
};
