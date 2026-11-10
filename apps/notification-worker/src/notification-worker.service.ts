import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { OrderCreatedEvent } from '@app/contracts';
import { MessagingService, QUEUES } from '@app/messaging';
import { EmailService } from './email.service';

@Injectable()
export class NotificationWorkerService implements OnApplicationBootstrap {
  private readonly logger = new Logger(NotificationWorkerService.name);

  constructor(
    private readonly messagingService: MessagingService,
    private readonly emailService: EmailService,
  ) {}

  // Runs after every module's onModuleInit, so the RabbitMQ connection is ready
  async onApplicationBootstrap() {
    await this.messagingService.consume<OrderCreatedEvent>(
      QUEUES.ORDER_CREATED,
      (event) => this.handleOrderCreated(event),
    );
  }

  private async handleOrderCreated(event: OrderCreatedEvent): Promise<void> {
    this.logger.log(`Received order.created for order ${event.orderId}`);
    await this.emailService.sendOrderConfirmation(
      event.customerEmail,
      event.orderId,
    );
  }
}
