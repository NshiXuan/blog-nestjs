/* eslint-disable prettier/prettier */
import { Role } from '@/auth/enum'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { user } from '@prisma/client'
import { Observable } from 'rxjs'

@Injectable()
export class RoleGuard implements CanActivate {
  // 注入反射
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 获取jwt策略校验通过时放到request中的user数据
    const user = context.switchToHttp().getRequest().user as user
    // console.log(user)

    // 通过反射获取@Auth装饰器中定义的角色
    // dec为装饰器的简写
    // roles要与装饰器的SetMetadata的参数一致
    const decRoles = this.reflector.getAllAndMerge<Role[]>('roles', [
      context.getHandler(),
      context.getClass
    ])

    console.log(decRoles, 'DecRoles')
    // 判断user数据的角色是否与@Auth装饰器上的角色一致
    // some方法只要包含一个就返回true 不包含返回false
    const decRolesHasUserRole = decRoles.some(role => user.role == role)

    // 返回true通过 返回false报错403
    // 如果装饰器@Auth中没定义有角色 说明登录即可使用这个方法 直接true通过
    // 如果装饰器@Auth中定义有角色 返回验证user的角色是否与@Auth定义的角色是否一致 
    return decRoles.length ? decRolesHasUserRole : true
  }
}
