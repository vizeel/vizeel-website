import { NestFactory } from '@nestjs/core';
import { ServerModule } from './server.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);

  // Enable CORS for frontend communication
  const corsOrigins = process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',')
    : ['http://localhost:8081', 'http://localhost:3000', 'http://localhost:5173'];
  
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = process.env.PORT || 4001;
  await app.listen(port);
  console.log(`🚀 Vizeel API Server is running on: http://localhost:${port}`);
}
bootstrap();
