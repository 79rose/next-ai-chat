/**
 * @author leewahjoel
 * @description 用户认证服务
 */

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/sign-in.dto';
import { SignOutDto } from './dto/sign-out.dto';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { USER_AVATAR, ActiveUserData } from '../const';
import { SignUpDto } from './dto/sign-up.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  //注册
  async logup(signUpDto: SignUpDto) {
    const { name, password, user_role } = signUpDto;
    const existUser = await await this.preloadUserByName(name);
    if (existUser) {
      throw new UnauthorizedException('User already exists');
    }
    const user = this.userRepository.create({
      user_name: name,
      password,
      user_avatar: USER_AVATAR,
      user_role,
    });
    const data = await this.userRepository.save(user);
    return { data };
  }

  //登录
  async login(signInDto: SignInDto) {
    const { name, password } = signInDto;

    const user = await this.userRepository.findOne({
      where: { user_name: name },
    });
    if (!user) throw new UnauthorizedException('User not found');

    const isEqual = password === user.password;
    if (!isEqual) throw new UnauthorizedException('Password is incorrect');
    const data = await this.generateTokens(user);
    return {
      data,
    };
  }
  async generateTokens(user: User) {
    const token = await this.signToken<Partial<ActiveUserData>>(user.id, {
      name: user.user_name,
    });
    // return { token }; return 格式 { data: { token } ,code:0, message: 'success' }
    return { token };
  }

  private async signToken<T>(userId: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
  }
  async logout(signOutDto: SignOutDto) {
    console.log(signOutDto);

    // Your implementation here
  }
  async preloadUserByName(name: string) {
    return this.userRepository.findOne({ where: { user_name: name } });
  }
}
