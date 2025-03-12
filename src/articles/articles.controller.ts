import { Controller, Post, Body, Put, Param, Delete, Get, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './schemas/article.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Статьи')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiOperation({ summary: 'Создать статью' })
  @ApiResponse({ status: 201, description: 'The article has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    schema: {
      example: {
        title: 'Sample Article Title',
        content: 'This is the content of the sample article.'
      }
    }
  })
  @Post()
  createArticle(@Body() body: { title: string; content: string }) {
    return this.articlesService.createArticle(body.title, body.content);
  }

  @ApiOperation({ summary: 'Обновить статью' })
  @ApiResponse({ status: 200, description: 'The article has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  @ApiBody({
    schema: {
      example: {
        title: 'Updated Article Title',
        content: 'This is the updated content of the article.'
      }
    }
  })
  @Put(':id')
  updateArticle(@Param('id') id: string, @Body() body: Partial<Article>) {
    return this.articlesService.updateArticle(id, body);
  }

  @ApiOperation({ summary: 'Удалить статью' })
  @ApiResponse({ status: 200, description: 'The article has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  @Delete(':id')
  deleteArticle(@Param('id') id: string) {
    return this.articlesService.deleteArticle(id);
  }

  @ApiOperation({ summary: 'Поставить лайк статье' })
  @ApiResponse({ status: 200, description: 'The article has been successfully liked.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  @Put(':id/like')
  likeArticle(@Param('id') id: string) {
    return this.articlesService.likeArticle(id);
  }

  @ApiOperation({ summary: 'Добавить комментарий статье' })
  @ApiResponse({ status: 200, description: 'The comment has been successfully added.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  @ApiBody({
    schema: {
      example: {
        comment: 'This is a sample comment.'
      }
    }
  })
  @Put(':id/comment')
  addComment(@Param('id') id: string, @Body() body: { comment: string }) {
    return this.articlesService.addComment(id, body.comment);
  }

  @ApiOperation({ summary: 'Получить список всех статей' })
  @ApiResponse({ status: 200, description: 'The articles have been successfully filtered.' })
  @Get()
  filterArticles(@Query() query: any) {
    return this.articlesService.filterArticles(query);
  }
}
