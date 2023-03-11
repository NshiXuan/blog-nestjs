/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService], // 这里注入的ConfigService会最为下面useFactory的参数
    useFactory: (config: ConfigService) => {
      return {
        secret: config.get('TOKEN_SECRET'), // TOKEN密钥
        signOptions: { // 签名选项
          expiresIn: '30d' // 过期时间30天
        }
      }
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
