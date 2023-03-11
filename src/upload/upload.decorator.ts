/* eslint-disable prettier/prettier */
import {
  applyDecorators,
  MethodNotAllowedException,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'

// 复用装饰器
export function Upload(field = 'file', opitons?: MulterOptions) {
  // 将文件拦截器装饰器抽出封装在Upload装饰器中
  return applyDecorators(UseInterceptors(FileInterceptor(field, opitons)))
}

// options: MulterOptions中有许多属性 比如limts限制文件大小

// 文件类型校验函数
// 封装为文件拦截器FileInterceptor中的options参数中的文件类型属性
// 然后传递给Upload装饰器的options 最终传递给文件拦截器FileInterceptor
export function fileFilter(type: string[]) {
  return (
    req: any,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void
  ) => {
    // console.log(file.mimetype)
    const check = type.some(t => file.mimetype.includes(t))
    if (!check) {
      // 如果不是图片类型
      callback(new MethodNotAllowedException('文件类型错误'), false)
    } else {
      callback(null, true)
    }
  }
}

// 封装上传图片的装饰器
export function ImageUpload(field = 'file') {
  return Upload(field, {
    limits: { fileSize: Math.pow(1024, 2) * 3 }, // 3M
    fileFilter: fileFilter(['image'])
  })
}

// 封装上传文档的装饰器
export function DocumentUpload(field = 'file') {
  return Upload(field, {
    limits: { fileSize: Math.pow(1024, 2) * 5 }, // 5M
    fileFilter: fileFilter(['application'])
  })
}

// 封装上传markdown文件装饰器
export function MarkDownUpload(field = 'file') {
  return Upload(field, {
    limits: { fileSize: Math.pow(1024, 2) * 3 }, // 3M
    fileFilter: fileFilter(['markdown'])
  })
}

// 封装一个通用的方法
export function UploadFile(field = 'file', type: string[] = ['image']) {
  return Upload(field, {
    limits: { fileSize: Math.pow(1024, 2) * 3 }, // 3M
    fileFilter: fileFilter(type)
  })
}