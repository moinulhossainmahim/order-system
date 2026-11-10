import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '@app/database';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderCreatedEvent } from '@app/contracts/events/order-created.event';
import { MessagingService } from '@app/messaging/messaging.service';
import { QUEUES } from '@app/messaging';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly messagingService: MessagingService,
  ) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const order = this.ordersRepository.create(dto);
    const saved = await this.ordersRepository.save(order);

    /* It will be moved to notification worker
    await this.emailService.sendOrderConfirmation(
      saved.customerEmail,
      saved.id,
    ); */

    const event: OrderCreatedEvent = {
      eventId: crypto.randomUUID(),
      orderId: saved.id,
      customerEmail: saved.customerEmail,
      createdAt: saved.createdAt.toISOString(),
    };

    // Publish the order created event
    this.messagingService.publish(QUEUES.ORDER_CREATED, event);

    return saved;
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ order: { createdAt: 'DESC' } });
  }
}
