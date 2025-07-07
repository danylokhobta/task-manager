import { NestFactory } from '@nestjs/core';
import { AppModule } from './/app.module';
import cookieParser from 'cookie-parser';
import { json } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://task-manager-xrli.onrender.com',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });
  app.use(cookieParser());
  app.use(json());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('API docs')
    .setVersion('0.2.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);

  // Start server
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, '0.0.0.0');
}

bootstrap().catch((err) => {
  console.error('Bootstrap failed:', err);
  process.exit(1);
});
