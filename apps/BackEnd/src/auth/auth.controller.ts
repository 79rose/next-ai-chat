import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignOutDto } from './dto/sign-out.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { SignUpDto } from './dto/sign-up.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto);
  }
  @Public()
  @Post('logout')
  async logout(@Body() signOutDto: SignOutDto) {
    return this.authService.logout(signOutDto);
  }
  @Public()
  @Post('logup')
  async logup(@Body() signUpDto: SignUpDto) {
    return this.authService.logup(signUpDto);
  }
}
