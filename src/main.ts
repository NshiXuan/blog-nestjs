import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import Validate from './common/validate'
import { TransformInterceptor } from './transform.interceptor'
import { ClassSerializerInterceptor } from '@nestjs/common'

async function bootstrap() {
  // 定义底层使用express上下文
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // 使用验证管道
  app.useGlobalPipes(new Validate())
  app.useGlobalInterceptors(new TransformInterceptor())

  // 定义api请求前缀
  app.setGlobalPrefix('api')

  // 开放静态文件访问 服务uploads目录 前缀为uploads
  app.useStaticAssets('uploads', { prefix: '/uploads' })

  // 解决跨域
  app.enableCors()

  // 全局使用拦截器进行时间序列化 也可以在控制器、方法中注册
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  await app.listen(3000)
}
bootstrap()
