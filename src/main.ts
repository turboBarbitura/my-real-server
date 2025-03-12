import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as swaggerUi from 'swagger-ui-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 // swagger setup
 const config = new DocumentBuilder()
 .setTitle('Backend Generator')
 .setDescription('Documentation API Test')
 .setVersion('1.0')
 .setBasePath('api/v1')
//  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
 .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('swagger', app, document, {
 customSiteTitle: 'Backend Generator',
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

  await app.listen(3001);
}
bootstrap();