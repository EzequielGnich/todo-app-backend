import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.use(helmet());

    app.enableCors({
      origin: false // Specify the allowed origins.  I'm setting false to allow requests from any origin
      // Find more configuration options here: https://github.com/expressjs/cors#configuration-options
    });

    const config = new DocumentBuilder().setTitle('Todos').setDescription('The Todos API').setVersion('0.1').build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // -- Validation
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true
        }
      })
    );

    await app.listen(process.env.PORT || 3000);
  } catch (err) {
    console.log(err);
    process.exit();
  }
}

bootstrap();
