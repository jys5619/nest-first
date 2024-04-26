import { User } from './entites/user.entity';
import { Repository } from 'typeorm';
import { CustomRepository } from 'src/db/typeorm-ex.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
