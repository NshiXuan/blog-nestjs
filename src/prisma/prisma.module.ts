/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Global() // 全局导出模块 可以直接注册使用
@Module({
  providers: [PrismaService],
  exports: [PrismaService] // 暴露出PrismaService服务
})
export class PrismaModule { }
