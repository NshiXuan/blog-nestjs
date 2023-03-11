/* eslint-disable prettier/prettier */
import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService, private config: ConfigService) { }

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: {
        title: createArticleDto.title,
        content: createArticleDto.content,
        categoryId: +createArticleDto.categoryId
      }
    })
  }

  async findAll(args: Record<string, any>) {
    const row = this.config.get('ARTICLE_PAGE_ROW')
    const page = args.page ? +args.page : 1
    console.log(args.category ? +args.category : {})
    // console.log(row)
    // 分页查询
    const articles = await this.prisma.article.findMany({
      skip: (page - 1) * row, // 从那开始 (0 10) (10 10)
      take: +row, // 查多少条
      where: { // 查询条件 按照栏目id条件查询 
        categoryId: args.category ? +args.category : {}
        // category: args.category ? { id: +args.category } : {} // 或者
      },
      include: {
        category: true // 确定获取关联的栏目数据
      }
    })

    const total = await this.prisma.article.count({
      // 如果有栏目id参数 按照栏目id条件查询总数
      where: { categoryId: args.category ? +args.category : {} }
    })
    return {
      meta: {
        current_path: page, // 当前页
        page_row: row, // 每页条数
        total,// 总条数
        total_page: Math.ceil(total / row)  // 总页数 向上取整
      },
      data: articles
    }
  }

  findOne(id: number) {
    return this.prisma.article.findFirst({
      where: {
        id
      }
    })
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: {
        id
      },
      data: {
        title: updateArticleDto.title,
        content: updateArticleDto.content,
        categoryId: updateArticleDto.categoryId
      }
    })
  }

  remove(id: number) {
    return this.prisma.article.delete({
      where: {
        id
      }
    })
  }
}
