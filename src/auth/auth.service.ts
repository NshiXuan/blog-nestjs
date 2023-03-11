/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { user } from '@prisma/client';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }

  // 注册用户
  async register(dto: RegisterDto) {
    // 1.判断用户是否已存在 通过装饰器判断

    // 2.通过prisma创建用户
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password: await hash(dto.password)
      }
    })

    // 3.返回user的token
    return this.token(user)
  }

  // 登录
  async login(dto: LoginDto) {
    // 1.通过唯一索引查找用户
    const user = await this.prisma.user.findUnique({
      where: {
        name: dto.name
      }
    })

    // 2.校验密码 
    // 数据库中的密码放在第一个参数
    if (!(await verify(user.password, dto.password))) {
      throw new BadRequestException('密码输入错误')
    }

    // 3.验证通过返回用户token
    return this.token(user)
  }

  // token生成器
  async token({ id, name }: user) {
    return {
      token: await this.jwt.signAsync({
        name,
        sub: id // 颁发者
      })
    }
  }

}
