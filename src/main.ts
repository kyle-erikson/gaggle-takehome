import serverless from "serverless-http";
import { Context } from "aws-lambda";
import { app } from "./loaders/app";
import logger from "./logger";
import database from "./loaders/database";

exports.http = async (event: any, context: Context) => {
  try {
    await database();

    const handler = serverless(app);
    return await handler(event, context);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
