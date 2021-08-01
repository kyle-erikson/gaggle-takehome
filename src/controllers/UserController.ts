import { Service } from "typedi";
import { User } from "../interfaces/user";
import { InjectRepository } from "typeorm-typedi-extensions";
import { UserRepository } from "../repositories/userRepository";
import { QueryError } from "../interfaces/errors";
import logger from "../logger";

@Service()
class UserController {
  constructor(
    @InjectRepository()
    private readonly userRepository: UserRepository
  ) {}

  GetById = async (id: number) => {
    let user: User | undefined = undefined;
    try {
      user = await this.userRepository.findById(id);
    } catch (error) {
      logger.error(error);
      throw { statusCode: 500, message: error.message } as QueryError;
    }

    if (!user) {
      const message = `No user found for id: ${id}`;
      logger.warn(message);
      throw {
        statusCode: 404,
        message,
      } as QueryError;
    }

    return user;
  };

  SearchForUser = async (searchTerm: string) => {
    let users: User[] = [];
    try {
      users = await this.userRepository.searchForUsers(searchTerm);
    } catch (error) {
      throw { statusCode: 500, message: error.message } as QueryError;
    }

    if (users.length <= 0) {
      const message = `No user(s) found for search term: ${searchTerm}`;
      logger.warn(message);
      throw {
        statusCode: 404,
        message,
      } as QueryError;
    }

    return users;
  };
}

export default UserController;
