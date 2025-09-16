import { NestFactory } from '@nestjs/core';
import { ServerModule } from './server.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);

  // Enable CORS for frontend communication
  const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : [];

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  const port = process.env.PORT || 4001;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Vizeel API Server is running on: http://localhost:${port}`);
}
bootstrap();
