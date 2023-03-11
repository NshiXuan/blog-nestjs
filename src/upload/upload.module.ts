/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { UploadService } from './upload.service'
import { UploadController } from './upload.controller';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: diskStorage({
            // 文件存储位置 会自动创建与src同级的uploads目录存储文件
            destination: 'uploads',

            // 文件名定制
            filename: (req, file, callback) => {
              const path =
                Date.now() +
                '-' +
                Math.round(Math.random() * 1e10) +
                extname(file.originalname)
              callback(null, path)
            }
          })
        }
      }
    })
  ],
  providers: [UploadService],
  controllers: [UploadController]
})
export class UploadModule { }
