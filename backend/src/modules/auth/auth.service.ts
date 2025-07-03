import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.create({ ...dto, password: hashed });
    return { message: 'User registered', user };
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwt.sign({ userId: user.id, role: user.role });
    return { access_token: token };
  }
  async getMe(userId: number) {
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    // Optional: remove password before returning
    const { password, ...rest } = user;
    return rest;
  }
}
