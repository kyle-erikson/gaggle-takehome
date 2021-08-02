import { Application, ErrorRequestHandler } from "express";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import routes from "../routes";
import config from "../config";
import logger from "../logger";
import database from "./database";

export const app: Application = express();

app.enable("trust proxy");
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/", routes);

//catch 404 and forward to error handler
app.use((req, res, next) => {
  const error: any = new Error(`Not Found: ${req.header}:${req.body}`,);
  error.status = 404;
  next(error);
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
    },
  });

  logger.error(err);

  return next(err);
};

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  database()
    .then(() => {
      try {
        app.listen(config.port, (): void => {
          logger.info(`Connected successfully on port ${config.port}`);
        });
      } catch (error) {
        logger.error(`Error occurred: ${error.message}`);
      }
    })
    .catch((err) => {
      logger.error("Error connecting to db: ", err);
    });
}

// module.exports = app;
