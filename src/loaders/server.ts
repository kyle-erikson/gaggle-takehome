import { Application, ErrorRequestHandler } from "express";
import { errors, isCelebrateError } from "celebrate";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import routes from "../routes";

export default (app: Application) => {
  app.enable("trust proxy");
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(errors());

  console.log("loading routes");
  app.use("/", routes);
  console.log("done with routes");

  //catch 404 and forward to error handler
  app.use((req, res, next) => {
    const error: any = new Error("Not Found");
    error.status = 404;
    next(error);
  });

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (isCelebrateError(err)) {
      return res.status(422).send({ error: err.details }).end();
    } else {
      res.status(err.status || 500);
      res.json({
        errors: {
          message: err.message,
        },
      });
    }
    return next(err);
  };

  app.use(errorHandler);
};
