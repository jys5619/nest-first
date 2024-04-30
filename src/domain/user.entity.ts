import { UserAuthority } from 'src/domain/user-authority.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => UserAuthority, (userAuthority) => userAuthority.user, {
    eager: true,
  })
  authorities: UserAuthority[];
}
