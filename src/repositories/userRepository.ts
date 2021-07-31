import { Service } from 'typedi';
import { EntityRepository } from 'typeorm';
import { User } from '../models/userModel';
import { Repository } from 'typeorm/repository/Repository';

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public findById(id: number) {
    return this.findOne(id);
  }

  public searchForUsers(searchTerm: string) {
    const users = this.createQueryBuilder("user")
                      .where(`LOWER(CONCAT(user.first_name, ' ', user.last_name)) LIKE %${searchTerm.toLowerCase()}%`)
                      .getMany();

    return users;
  }
}