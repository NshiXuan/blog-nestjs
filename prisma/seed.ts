/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import { random } from 'lodash'
import { Random } from 'mockjs'

const prisma = new PrismaClient()

async function run() {
  // 创建用户
  await prisma.user.create({
    data: {
      name: 'admin',
      password: await hash('admin123'),
      role: 'admin'
    }
  })

  // 创建栏目 5个
  for (let i = 1; i <= 5; i++) {
    await prisma.category.create({
      data: {
        title: Random.ctitle(3, 6) // 生成3-6中文的标题
      }
    })
  }

  // 创建20条文章
  for (let i = 0; i < 20; i++) {
    await prisma.article.create({
      data: {
        title: Random.ctitle(10, 20), // 生成10-20个字的中文标题
        content: Random.cparagraph(30, 50), // 生成30-50个字的中文段落
        categoryId: random(1, 5) // 随机生成1-5之间的数
      }
    })
  }
}

run()