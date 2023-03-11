/* eslint-disable prettier/prettier */
import { Auth } from '@/auth/decorators/auth.decorator'
import {
  Body, Controller, Delete, Get, Param, Patch, Post
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  // 使用守卫验证是否登录 有权限添加文章 
  // 不只是登录后 而且需要角色为admin才能添加
  // @UseGuards(AuthGuard('jwt'))

  // 代表只有Role.ADMIN这个角色才能访问
  @Auth()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto)
  }

  @Get()
  findAll() {
    return this.categoryService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(+id, updateCategoryDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id)
  }
}
