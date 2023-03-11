/* eslint-disable prettier/prettier */
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UseInterceptors
} from '@nestjs/common'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { Article } from './entities/article.entity'

@Controller('article')
@UseInterceptors(ClassSerializerInterceptor)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto)
  }

  @Get()
  findAll(@Query() args = {}) {
    return this.articleService.findAll(args)
  }

  @Get(':id')
  // strategy: 'excludeAll' 代表默认返回的字段全都不返回
  // strategy: 'exposeAll' 代表默认返回的全部字段
  // @SerializeOptions({ strategy: 'exposeAll' }) 我们这里默认返回全部 不需要
  async findOne(@Param('id') id: string) {
    const article = await this.articleService.findOne(+id)
    return new Article(article)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id)
  }
}
