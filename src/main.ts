import loaders from "./loaders";
import serverless from 'serverless-http';
import { createServer, proxy } from "aws-serverless-express";
import { Context } from "aws-lambda";
import {app} from './loaders/app';
// const serverless = require('serverless-http');
const serverlessExpress = require('@vendia/serverless-express');
// const app = async () => {
//   return await loaders
// }
// import server from './loaders/server';

// const server = createServer(app, app);

// export const http = (event: any, context: Context) =>
//   proxy(server, event, context);

exports.http = serverlessExpress({app});