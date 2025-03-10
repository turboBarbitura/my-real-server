import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}

  async createArticle(title: string, content: string): Promise<Article> {
    const newArticle = new this.articleModel({ title, content });
    return newArticle.save();
  }

  async updateArticle(id: string, updateData: Partial<Article>): Promise<Article | null> {
    return this.articleModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteArticle(id: string): Promise<Article | null> {
    return this.articleModel.findByIdAndDelete(id);
  }

  async likeArticle(id: string): Promise<Article | null> {
    return this.articleModel.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
  }

  async addComment(id: string, comment: string): Promise<Article | null> {
    return this.articleModel.findByIdAndUpdate(id, { $push: { comments: comment } }, { new: true });
  }

  async filterArticles(filter: any): Promise<Article[]> {
    return this.articleModel.find(filter);
  }
}
