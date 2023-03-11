/* eslint-disable prettier/prettier */
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Role } from '../enum'
import { RoleGuard } from '../guards/role/role.guard'


// 复用装饰器
export function Auth(...roles: Role[]) {
  // console.log(roles)
  // SetMetadata的作用相当于pinia 把roles的数据保存起来
  // UseGuards代表使用守卫 这里代表登录后需要验证token是否有效 再验证角色是否有权限
  return applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard('jwt'), RoleGuard))
}