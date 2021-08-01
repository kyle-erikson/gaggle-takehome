import { Router } from "express";
import { Container } from "typedi";
import UserController from "../controllers/UserController";
import Joi from "joi";
import { SearchForUserReqBody } from "../interfaces/requests";
import { QueryError } from "../interfaces/errors";

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

        const userController2: UserController = Container.get(UserController);

        const { searchTerm } = req.body as SearchForUserReqBody;

        return res
          .status(200)
          .json(await userController2.SearchForUser(searchTerm));
      } catch (error: unknown) {
        const queryError = error as QueryError;
        return res
          .status(queryError.statusCode)
          .json({ error: queryError.message });
      }
    }
  );

  route.get(
    "/:id",
    //Could have middleware here for auth,
    async (req, res) => {
      const { id } = req.params;
      const intId = parseInt(id);

      if (!intId)
        res.status(400).json({
          error: "ID needs to be an integer value",
        });

      const userController2: UserController = Container.get(UserController);

      try {
        return res.status(200).json(await userController2.GetById(intId));
      } catch (error: unknown) {
        const queryError = error as QueryError;
        return res
          .status(queryError.statusCode)
          .json({ error: queryError.message });
      }
    }
  );
};
