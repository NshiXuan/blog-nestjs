import { Controller, Post, UploadedFile } from '@nestjs/common'
import { ImageUpload } from './upload.decorator'

@Controller('upload')
export class UploadController {
  @Post('image')
  @ImageUpload()
  // @UploadedFile获取接收到的文件
  image(@UploadedFile() file: Express.Multer.File) {
    return {
      meta: {},
      errno: 0,
      data: {
        url: `http://localhost:3000/${file.path}`
      }
    }
  }
}
