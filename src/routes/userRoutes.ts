import { Router } from "express";
import { Container } from "typedi";
import UserController from "../controllers/userController";
import Joi from "joi";
import { SearchForUserReqBody } from "../interfaces/requests";
import { QueryError } from "../interfaces/errors";
import { Response } from "express";
import logger from "../logger";

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  //NOTE: Could add Winston middleware to log all requests and responses

  route.get(
    "/search",
    //Could have middleware here for auth,
    //Attempted to use a middleware like Celebrate for Joi validation,
    //but was having issues and I don't have enough time to troubleshoot.
    async (req, res) => {
      console.log("calling search");
      console.log(req.body);

      const schema = Joi.object().keys({
        searchTerm: Joi.string().min(2).trim().required(),
      });

      try {
        const validationResult = schema.validate(req.body);
        if (validationResult.error)
          throw {
            statusCode: 422,
            message: validationResult.error.message,
          } as QueryError;

        const userController: UserController = Container.get(UserController);

        const { searchTerm } = req.body as SearchForUserReqBody;

        return res
          .status(200)
          .json(await userController.SearchForUser(searchTerm));
      } catch (error: unknown) {
        return handleQueryError(error, res);
      }
    }
  );

  //This is for your testing purposes only
  route.get("/allUsers", async (req, res) => {
    const userController: UserController = Container.get(UserController);

    try {
      return res.status(200).json(await userController.GetAllUsers());
    } catch (error: unknown) {
      return handleQueryError(error, res);
    }
  });

  //Previously was using request parameters, but seems like Lambda functions have trouble with that
  route.get(
    "/:id",
    //Could have middleware here for auth,
    async (req, res) => {
      try {
        const { id } = req.params;

        const integerId = Number.parseInt(id);

        const userController: UserController = Container.get(UserController);

        return res.status(200).json(await userController.GetById(integerId));
      } catch (error: unknown) {
        return handleQueryError(error, res);
      }
    }
  );
};

const handleQueryError = (error: unknown, res: Response) => {
  const queryError = error as QueryError;
  logger.error(queryError);
  return res.status(queryError.statusCode).json({ error: queryError.message });
};
