import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { UserService } from "../services/userService";
import { User } from "../interfaces/user";
import { SearchForUserReqBody } from "../interfaces/requests";
import { Container, InjectRepository } from "typeorm-typedi-extensions";
import { UserRepository } from "../repositories/userRepository";

@Service()
class UserController2 {
  constructor(
    @InjectRepository()
    private readonly userRepository: UserRepository
  ) {}

  GetById = async (id: number) => {
    return await this.userRepository.findById(id);
  };

  SearchForUser = async (searchTerm: string) => {
    return await this.userRepository.searchForUsers(searchTerm);
  };
}

export default UserController2;
