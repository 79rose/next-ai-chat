// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import jwtConfig from '../config/jwt.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { AccessTokenGuard } from './guards/access-token.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    // 注入User实体
    TypeOrmModule.forFeature([User]),
    // 注入ConfigModule
    ConfigModule.forFeature(jwtConfig),
    // 注入JwtModule
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AuthModule {}
