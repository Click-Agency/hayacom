import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: [process.env.WEB_BASE_URL_IP, process.env.WEB_BASE_URL_DOMAIN],
    exposedHeaders: ['authorization'],
  });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  await app.listen(process.env.PORT ?? 8080, () => {
    console.log(
      `Server is running in Mode: ${process.env.NODE_ENV ?? 'local'} on Port: ${process.env.PORT ?? 8080}`,
    );
  });
}
bootstrap();
