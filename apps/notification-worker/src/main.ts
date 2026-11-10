import { NestFactory } from '@nestjs/core';
import { NotificationWorkerModule } from './notification-worker.module';

// async function bootstrap() {
//   const app = await NestFactory.create(NotificationWorkerModule);
//   await app.listen(process.env.port ?? 3000);
// }
// bootstrap();

async function bootstrap() {
  // No HTTP server: this app only listens to RabbitMQ
  await NestFactory.createApplicationContext(NotificationWorkerModule);
}
bootstrap();
