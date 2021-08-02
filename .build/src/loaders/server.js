"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("../routes"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("../logger"));
const server = () => {
    const app = express_1.default();
    app.enable("trust proxy");
    app.use(cors_1.default());
    app.use(helmet_1.default());
    app.use(express_1.default.json());
    app.use("/", routes_1.default);
    //catch 404 and forward to error handler
    app.use((req, res, next) => {
        const error = new Error("Not Found");
        error.status = 404;
        next(error);
    });
    const errorHandler = (err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
        logger_1.default.error(err);
        return next(err);
    };
    app.use(errorHandler);
    if (process.env.NODE_ENV !== "test") {
        try {
            app.listen(config_1.default.port, () => {
                logger_1.default.info(`Connected successfully on port ${config_1.default.port}`);
            });
        }
        catch (error) {
            logger_1.default.error(`Error occurred: ${error.message}`);
        }
    }
    return app;
};
exports.default = server;
