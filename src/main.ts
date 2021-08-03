import loaders from "./loaders";
import serverless from 'serverless-http';
import { createServer, proxy } from "aws-serverless-express";
import { Context } from "aws-lambda";
import {app} from './loaders/app';
import logger from "./logger";
import database from "./loaders/database";
// const serverless = require('serverless-http');
// const serverlessExpress = require('@vendia/serverless-express');
// const app = async () => {
//   return await loaders
// }
// import server from './loaders/server';

// const server = createServer(app, app);

// export const http = (event: any, context: Context) =>
//   proxy(server, event, context);

// exports.http = serverlessExpress({app});

exports.http = async (event: any, context: Context) => {
  try {
    await database();

    const handler = serverless(app);
    return await handler(event, context);
  } catch (error) {
    logger.error(error);
    throw error;
  }
}