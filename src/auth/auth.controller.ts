import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginGuard } from './guards/login.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @UseGuards(LoginGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

}
