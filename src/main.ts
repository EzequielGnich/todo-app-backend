import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ImATeapotException, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { whitelist } from './common/constants';
import { logger } from './logger/winston.config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: {
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
        origin: function (origin, callback) {
          if (!origin) {
            callback(null, true);
            return;
          }
          if (whitelist.includes(origin) || !!origin.match(/yourdomain\.com$/)) {
            callback(null, true);
          } else {
            logger.error(`CORS: ${origin} not allowed`);
            callback(new ImATeapotException('Not allowed by CORS'), false);
          }
        }
      }
    });

    app.use(helmet());

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
