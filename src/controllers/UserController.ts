import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { UserService } from "../services/userService";
import { User } from "../interfaces/user";
import { SearchForUserReqBody } from "../interfaces/requests";
import { Container } from "typeorm-typedi-extensions";

@Service()
class UserController {
  constructor() {
  }
  
  GetById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const intId = parseInt(id);

    if (!intId)
      res.status(400).json({
        error: "ID needs to be an integer value",
      });

    const userService = Container.get(UserService);  
    const user: User | undefined = await userService.GetUserById(intId);

    return res.status(200).json(user);
  };

  SearchForUser = async (req: Request, res: Response) => {
    const { searchTerm } = req.body as SearchForUserReqBody;

    const userService = Container.get(UserService);
    const users: User[] = await userService.SearchForUser(searchTerm);

    if (users.length <= 0) res.status(404).json({message: `No users found matching search term: ${searchTerm}`})

    return res.status(200).json(users);
  };
}

export default UserController;
