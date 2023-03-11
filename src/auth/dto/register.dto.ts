/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator'
import { IsConfirm } from 'src/common/rules/is-confirm.rule'
import { IsNotExists } from 'src/common/rules/is-not-exists.rule'

export default class RegisterDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  // 调用自定义的验证用户是否存在装饰器进行验证
  @IsNotExists('user', { message: '用户已存在' })
  name: string

  @IsNotEmpty({ message: '密码不能为空' })
  @IsConfirm({ message: '两次密码不一致' })
  password: string

  @IsNotEmpty({ message: '确认密码不能为空' })
  password_confirm: string
}
