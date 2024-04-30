import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { UserRepository } from 'src/users/user.repository';
import { jwtConstants } from './jwt-contants';
import { Payload } from './payload.interface';
import { User } from 'src/users/entites/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: jwtConstants.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
    const { id } = payload;
    const user: User = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException();
    }

    console.log('payload1', payload);
    return done(null, user);
  }
}
