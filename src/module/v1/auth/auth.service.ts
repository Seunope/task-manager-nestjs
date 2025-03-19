import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/users.dto';
import {
  comparePasswords,
  hashPassword,
} from 'src/module/common/utils/password.util';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const hashedPassword = await hashPassword(createUserDto.password);
    const user = await this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user || !(await comparePasswords(password, user.password))) {
      throw new UnauthorizedException({
        message: 'Invalid email or password',
        status: false,
      });
    }
    const payload = { email: user.email, sub: user.id };
    delete user.password;
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }
}
