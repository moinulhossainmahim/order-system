import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@app/database';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MessagingModule } from '@app/messaging/messaging.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), MessagingModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
