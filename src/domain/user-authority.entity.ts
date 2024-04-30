import { User } from 'src/domain/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_authority')
export class UserAuthority {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'user_id' })
  userId: string;

  @Column({ name: 'authority_name' })
  authorityName: string;

  @ManyToOne(() => User, (user) => user.authorities)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
