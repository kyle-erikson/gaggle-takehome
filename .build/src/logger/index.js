"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
//This is a really simple example for using a global logging framework
exports.default = winston_1.createLogger({
    level: "info",
    format: winston_1.format.json(),
    //Can add more transports here for production level logging.
    transports: [new winston_1.transports.Console({ format: winston_1.format.simple() })],
});
