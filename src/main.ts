import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as swaggerUi from 'swagger-ui-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My Real Server API')
    .setDescription('Докуменатци API сервиса для тренировки запросов с клиентской части')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Используем swagger-ui-express
  app.use('/api', swaggerUi.serve, swaggerUi.setup(document));

  await app.listen(3001);
}
bootstrap();