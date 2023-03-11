/* eslint-disable prettier/prettier */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from '@nestjs/common'
import { Request } from 'express'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    // 获取http的request对象
    // const request = context.switchToHttp().getRequest() as Request
    // const startTime = Date.now()

    return next.handle().pipe(
      map((data) => {
        // const endTime = Date.now()
        // // 自定义打印日志
        // new Logger().log(
        //   `TIME: ${endTime - startTime}\tURL:${request.path}\tMETHOD:${request.method
        //   }`
        // )

        // 如果数据里面有元信息meta说明是分页不用包裹在data中 直接返回 否则其它包裹data
        return data?.meta ? data : { data: data }
      })
    )
  }
}