import loaders from "./loaders";
import serverless from 'serverless-http';
import { createServer, proxy } from "aws-serverless-express";
import { Context } from "aws-lambda";
// const serverless = require('serverless-http');
const app = async () => {
  return await loaders
}

const server = createServer(app, undefined);

export const http = (event: any, context: Context) =>
  proxy(server, event, context);