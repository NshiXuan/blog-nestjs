/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { ArticleModule } from './article/article.module'
import { ConfigModule } from '@nestjs/config'
import { CategoryModule } from './category/category.module';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ArticleModule,
    ConfigModule.forRoot({
      isGlobal: true // 全局注册读取配置或者环境变量的模块
    }),
    CategoryModule,
    UploadModule
  ],
  controllers: [],
  providers: [UploadService]
})
export class AppModule { }
