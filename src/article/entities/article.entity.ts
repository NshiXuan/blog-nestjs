import { article } from '@prisma/client'
import { Exclude, Expose, Transform } from 'class-transformer'
import dayjs from 'dayjs'

export class Article {
  // @Exclude() // 去除
  // @Expose()
  // // 可以对返回的数据进行转换
  // @Transform(({ value }) => {
  //   return value + '- 哈哈哈'
  // })
  // title: string
  // @Exclude()
  // content: string

  // args包含很多数据 createdAt的值在args.value中
  // format不要小写 小写会变成英文
  @Transform((args) => dayjs(args.value).format('YYYY-MM-DD'))
  createdAt: string

  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
  updatedAt: string

  // Partial把article类型变成可选
  constructor(options: Partial<article>) {
    // 实例化的对象的this赋值为options属性
    Object.assign(this, options)
  }
}
