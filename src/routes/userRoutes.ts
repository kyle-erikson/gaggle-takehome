import { Router } from "express";
import { celebrate } from "celebrate";
import { Container } from "typedi";
import { Container as Container2 } from "typeorm-typedi-extensions";
import UserController from "../controllers/UserController";
import Joi from "joi";
import { useContainer } from "typeorm";

const route = Router();

export default (app: Router) => {
  const userController = Container.get(UserController);

  app.use("/users", route);

  route.get(
    "/:id",
    //Could have middleware here for auth,
    celebrate({
      params: Joi.object({
        id: Joi.string().trim().required(),
      }),
    }),
    (req, res) => userController.GetById(req, res)
  );
  route.get(
    "/search",
    //Could have middleware here for auth,
    celebrate({
      body: Joi.object({
        searchTerm: Joi.string().trim().min(2).required(),
      }),
    }),
    (req, res) => userController.SearchForUser(req, res)
  );
};

