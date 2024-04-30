import { UserAuthority } from 'src/domain/user-authority.entity';

export class UserDto {
  id: string;
  username: string;
  password: string;
  authorities: UserAuthority[];
}
