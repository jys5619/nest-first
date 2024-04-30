import { UserAuthority } from 'src/auth/security/user-authority.entity';

export class UserDto {
  id: string;
  username: string;
  password: string;
  authorities: UserAuthority[];
}
