/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client'
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

// table为装饰器的第一个参数 表的名称
export function IsExists(
  table: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Record<string, any>, propertyName: string) {
    // 注册装饰器
    registerDecorator({
      name: 'IsExists',// 装饰器名称
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table],
      options: validationOptions,
      validator: {
        // value为dto配置了装饰器的字段的值 如下的name
        async validate(value: string, args: ValidationArguments) {
          // 通过prisma查看是否存在 比如用户
          // console.log(propertyName, args)
          const prisma = new PrismaClient()
          const user = await prisma[table].findFirst({
            where: {
              // 对象中使用[]才能表示变量
              [propertyName]: args.value
            }
          })

          // 返回false会输出装饰器中的message中值 这里用户存在的时候为false
          return Boolean(user)
        }
      }
    })
  }
}