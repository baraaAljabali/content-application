import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { LoginStrategy } from './strategies/login-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtStrategy } from './strategies/jwt-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [
    AuthService,
    UserService,
    LoginStrategy,
    JwtStrategy,
    UserService,
  ],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt_secret'),
        signOptions: { expiresIn: '3600s' },
      }),
    }),
  ],
})
export class AuthModule {}
