/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from 'src/prisma/prisma.service'

// 记得使用这个装饰器 不然不会注入constructor中的参数
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService, private prisma: PrismaService) {
    // 分析完后会提取到用户的id放到下面的validate中
    // 如果token是无效的会自动抛出异常
    super({
      // 解析提交的Bearer Token header数据
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 加密的token密钥
      secretOrKey: configService.get('TOKEN_SECRET')
    })
  }

  // 验证通过后解析用户资料
  async validate({ sub: id }) {
    // 根据id查询成功后会把用户数据放到一个 request对象里面
    return this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }
}