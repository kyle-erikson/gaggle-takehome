import { Router } from "express";
import { celebrate } from "celebrate";
import { Container } from "typedi";
import { Container as Container2 } from "typeorm-typedi-extensions";
import UserController from "../controllers/UserController";
import UserController2 from "../controllers/userController2";
import Joi from "joi";
import { useContainer } from "typeorm";
import { User } from "../interfaces/user";
import { SearchForUserReqBody } from "../interfaces/requests";

const route = Router();

// export default (app: Router) => {
//   const userController = Container.get(UserController);

//   app.use("/users", route);

//   route.get(
//     "/:id",
//     //Could have middleware here for auth,
//     celebrate({
//       params: Joi.object({
//         id: Joi.string().trim().required(),
//       }),
//     }),
//     (req, res) => userController.GetById(req, res)
//   );
//   route.get(
//     "/search",
//     //Could have middleware here for auth,
//     celebrate({
//       body: Joi.object({
//         searchTerm: Joi.string().trim().min(2).required(),
//       }),
//     }),
//     (req, res) => userController.SearchForUser(req, res)
//   );
// };

export default (app: Router) => {
  app.use("/users", route);

  route.get(
    "/:id",
    //Could have middleware here for auth,
    celebrate({
      params: Joi.object({
        id: Joi.string().trim().required(),
      }),
    }),
    async (req, res) => {
      const { id } = req.params;
      const intId = parseInt(id);

      if (!intId)
        res.status(400).json({
          error: "ID needs to be an integer value",
        });

      const userController2: UserController2 = Container.get(UserController2);
      const user: User | undefined = await userController2.GetById(intId);

      return res.status(200).json(user);
    }
  );
  route.get(
    "/search",
    //Could have middleware here for auth,
    celebrate({
      body: Joi.object({
        searchTerm: Joi.string().trim().min(2).required(),
      }),
    }),
    async (req, res) => {
      const userController2: UserController2 = Container.get(UserController2);

      const { searchTerm } = req.body as SearchForUserReqBody;

      const users: User[] = await userController2.SearchForUser(searchTerm);
      if (users.length <= 0)
        res.status(404).json({
          message: `No users found matching search term: ${searchTerm}`,
        });

      return res.status(200).json(users);
    }
  );
};
