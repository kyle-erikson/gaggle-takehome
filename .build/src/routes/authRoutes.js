"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = __importDefault(require("../logger"));
const route = express_1.Router();
exports.default = (app) => {
    app.use('/auth', route);
    route.post('/', 
    //Do req header and body validation using Celebrate + Joi,
    async (req, res, next) => {
        try {
            // EXAMPLE OF POSSIBLE AUTH
            // const authServiceInstance = Container.get(AuthService);
            // const { user, token } = await authServiceInstance.Authenticate(req.body as User);
            // return res.json({ user, token }).status(201);
        }
        catch (e) {
            logger_1.default.error(' error ', e);
            return next(e);
        }
    });
};
