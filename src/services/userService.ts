import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../models/userModel";
import { UserRepository } from "../repositories/userRepository";

@Service()
export class UserService {
  constructor(
    @InjectRepository()
    private readonly userRepository: UserRepository
  ) {}

  public async GetUserById(id: number): Promise<User|undefined> {
    return this.userRepository.findById(id);
  }

  public async SearchForUser(searchTerm: string): Promise<User[]> {
    return this.userRepository.searchForUsers(searchTerm);
  }
}
