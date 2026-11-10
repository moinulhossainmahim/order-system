import { Module } from '@nestjs/common';
import { NotificationWorkerService } from './notification-worker.service';
import { MessagingModule } from '@app/messaging/messaging.module';
import { EmailService } from './email.service';

@Module({
  imports: [MessagingModule],
  providers: [NotificationWorkerService, EmailService],
})
export class NotificationWorkerModule {}
