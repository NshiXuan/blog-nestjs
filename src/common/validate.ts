/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common'

export default class Validate extends ValidationPipe {
  protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
    // 错误数据的数组
    // console.log(validationErrors)
    // [
    //   ValidationError {
    //   target: RegisterDto { name: 'admin', password: 'admin123' },
    //   value: 'admin',
    //     property: 'name',
    //       children: [],
    //         constraints: { IsNotExistsRule: '用户已存在' }
    //   }
    // ]

    const messages = {}
    validationErrors.map(error => {
      // Object.values获取对象的values返回一个新的数组
      messages[error.property] = Object.values(error.constraints)[0]
    })
    // console.log(errors)
    throw new HttpException({
      code: 422,
      messages
    }, HttpStatus.UNPROCESSABLE_ENTITY)
  }
}
