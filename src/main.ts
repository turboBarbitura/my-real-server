import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as swaggerUi from 'swagger-ui-express';
import { get } from 'http';
import { createWriteStream } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('/swagger', app, document);


const serverUrl = "https://my-real-server.vercel.app"

// get the swagger json file (if app is running in development mode)
if (process.env.NODE_ENV === 'development') {

  // write swagger ui files
  get(
    `${serverUrl}/swagger/swagger-ui-bundle.js`, function 
    (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
      console.log(
  `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`,
);
  });

  get(`${serverUrl}/swagger/swagger-ui-init.js`, function (response) {
    response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
    console.log(
  `Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`,
);
  });

  get(
`${serverUrl}/swagger/swagger-ui-standalone-preset.js`,
function (response) {
    response.pipe(
    createWriteStream('swagger-static/swagger-ui-standalone-preset.js'),
  );
    console.log(
    `Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`,
  );
  });

  get(`${serverUrl}/swagger/swagger-ui.css`, function (response) {
    response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
    console.log(
  `Swagger UI css file written to: '/swagger-static/swagger-ui.css'`,
);
  });

}

  // Используем swagger-ui-express
  app.use('/api', swaggerUi.serve, swaggerUi.setup(document));

  await app.listen(3001);
}
bootstrap();