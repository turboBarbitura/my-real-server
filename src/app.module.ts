import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://turbobarbitura_dev:Vbifyzvb911@my-real-server.oxdf6.mongodb.net/mentor_db?retryWrites=true&w=majority&appName=my-real-server'),
    UsersModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
