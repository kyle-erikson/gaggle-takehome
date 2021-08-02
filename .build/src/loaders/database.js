"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const config_1 = __importDefault(require("../config"));
const userModel_1 = require("../models/userModel");
exports.default = async () => {
    // read connection options from config file which reads from ENV
    const connectionOptions = {
        type: 'postgres',
        host: config_1.default.database.host,
        port: config_1.default.database.port,
        database: config_1.default.database.database,
        username: config_1.default.database.username,
        password: config_1.default.database.password,
        logging: true,
        entities: [userModel_1.User],
    };
    // typedi + typeorm
    typeorm_1.useContainer(typeorm_typedi_extensions_1.Container);
    // create a connection using modified connection options
    const connection = await typeorm_1.createConnection(connectionOptions);
    return connection;
};
