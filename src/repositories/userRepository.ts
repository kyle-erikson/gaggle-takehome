import { Service } from 'typedi';
import { EntityRepository, IsNull, Not } from 'typeorm';
import { User } from '../models/userModel';
import { Repository } from 'typeorm/repository/Repository';

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public findById(id: number) {
    return this.findOne(id, {
      where: {
        first_name: Not(IsNull()),
        last_name: Not(IsNull())
      }
    });
  }

  public searchForUsers(searchTerm: string) {
    const users = this.createQueryBuilder("user")
                      .where('user.first_name IS NOT NULL')
                      .andWhere('user.last_name IS NOT NULL')
                      .andWhere(`LOWER(CONCAT(user.first_name, ' ', user.last_name)) LIKE '%${searchTerm.toLowerCase()}%'`)
                      .getMany();

    return users;
  }
}