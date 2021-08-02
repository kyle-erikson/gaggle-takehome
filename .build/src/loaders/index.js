"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const logger_1 = __importDefault(require("../logger"));
const database_1 = __importDefault(require("./database"));
const server_1 = __importDefault(require("./server"));
exports.default = async () => {
    try {
        await database_1.default();
    }
    catch (error) {
        logger_1.default.error("Error connecting to db", error);
    }
    const app = await server_1.default();
    logger_1.default.info("Server loaded!");
    return app;
};
