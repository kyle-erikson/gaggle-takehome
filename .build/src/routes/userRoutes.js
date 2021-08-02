"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = require("typedi");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const joi_1 = __importDefault(require("joi"));
const route = express_1.Router();
exports.default = (app) => {
    app.use("/users", route);
    //NOTE: Could add Winston middleware to log all requests and responses
    route.get("/search", 
    //Could have middleware here for auth,
    //Attempted to use a middleware like Celebrate for Joi validation, 
    //but was having issues and I don't have enough time to troubleshoot.
    async (req, res) => {
        const schema = joi_1.default.object().keys({
            searchTerm: joi_1.default.string().min(2).trim().required(),
        });
        try {
            const validationResult = schema.validate(req.body);
            if (validationResult.error)
                throw {
                    statusCode: 422,
                    message: validationResult.error.message,
                };
            const userController2 = typedi_1.Container.get(UserController_1.default);
            const { searchTerm } = req.body;
            return res
                .status(200)
                .json(await userController2.SearchForUser(searchTerm));
        }
        catch (error) {
            const queryError = error;
            return res
                .status(queryError.statusCode)
                .json({ error: queryError.message });
        }
    });
    route.get("/:id", 
    //Could have middleware here for auth,
    async (req, res) => {
        const { id } = req.params;
        const intId = parseInt(id);
        if (!intId)
            res.status(400).json({
                error: "ID needs to be an integer value",
            });
        const userController2 = typedi_1.Container.get(UserController_1.default);
        try {
            return res.status(200).json(await userController2.GetById(intId));
        }
        catch (error) {
            const queryError = error;
            return res
                .status(queryError.statusCode)
                .json({ error: queryError.message });
        }
    });
};
