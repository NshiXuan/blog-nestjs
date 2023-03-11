/* eslint-disable prettier/prettier */
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from 'class-validator'

// table为装饰器的第一个参数 表的名称
export function IsConfirm(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    // 注册装饰器
    registerDecorator({
      name: 'IsConfirm', // 装饰器名称
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        // value为dto配置了装饰器的字段的值 如下的name
        async validate(value: string, args: ValidationArguments) {
          // 返回false会输出装饰器中的message中值
          return Boolean(value == args.object[`${args.property}_confirm`])
        }
      }
    })
  }
}
