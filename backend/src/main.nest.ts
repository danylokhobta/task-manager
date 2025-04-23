import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function createNestApp(expressApp: express.Application): Promise<INestApplication> {
  const adapter = new ExpressAdapter(expressApp);

  // Prevent NestJS from registering any parser middleware (fixes Express v5 issues)
  (adapter as any).isMiddlewareApplied = () => true;

  const nestApp = await NestFactory.create(AppModule, adapter);

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('API documentation for Task Manager')
    .setVersion('1.0')
    .addBearerAuth() // Add authentication if needed
    .build();

  const document = SwaggerModule.createDocument(nestApp, config);
  SwaggerModule.setup('/api-docs', nestApp, document); // Swagger UI available at /api-docs

  await nestApp.init();
  return nestApp;
}