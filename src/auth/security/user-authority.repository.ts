import { CustomRepository } from 'src/db/typeorm-ex.decorator';
import { UserAuthority } from '../../domain/user-authority.entity';
import { Repository } from 'typeorm';

@CustomRepository(UserAuthority)
export class UserAuthorityRepository extends Repository<UserAuthority> {}
