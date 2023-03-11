import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // 配置打印sql日志
    super({
      log: ['query']
    })
  }
}
