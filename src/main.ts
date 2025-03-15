import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 const config = new DocumentBuilder()
 .setTitle('My Real Server API')
 .setDescription('Докуменатци API сервиса для построения запросов с клиентской части')
 .setVersion('0.1')
 .build();

 // Конфиг сваггера со сторонними бандлами исключительно для деплоя на vercel
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('swagger', app, document, {
 customSiteTitle: 'My Real Server API',
 customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
 customJs: [
   'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
   'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
 ],
 customCssUrl: [
   'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
   'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
   'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
 ],
});

app.enableCors({
  origin: "*",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
});

  await app.listen(3001);
}
bootstrap();