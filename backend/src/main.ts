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
      'http://localhost:5000',
      'http://localhost:5173',
      'https://task-manager-spn5.onrender.com',
      'https://backend-dg9f.onrender.com',
    ],
    credentials: true,
  });
  app.use(cookieParser());
  app.use(json());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);

  // Start server
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
}

bootstrap().catch((err) => {
  console.error('Bootstrap failed:', err);
  process.exit(1);
});
