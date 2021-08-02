"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./loaders/app");
// const serverless = require('serverless-http');
const serverlessExpress = require('@vendia/serverless-express');
// const app = async () => {
//   return await loaders
// }
// import server from './loaders/server';
// const server = createServer(app, app);
// export const http = (event: any, context: Context) =>
//   proxy(server, event, context);
exports.http = serverlessExpress({ app: app_1.app });
