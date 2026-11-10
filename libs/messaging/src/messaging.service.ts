import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Channel, ChannelModel, connect, ConsumeMessage } from 'amqplib';
import { QUEUES } from './queues';

const RABBITMQ_URL = 'amqp://admin:admin@localhost:5672';

@Injectable()
export class MessagingService implements OnModuleInit {
  private readonly logger = new Logger(MessagingService.name);
  private connection: ChannelModel;
  private channel: Channel;

  async onModuleInit() {
    // 1. One TCP connection from this app to RabbitMQ
    this.connection = await connect(RABBITMQ_URL);

    // 2. A channel: a lightweight "lane" inside the connection. All work happens on channels.
    this.channel = await this.connection.createChannel();

    // 3. Make sure the queue exists (creates it if missing, does nothing if it already exists)
    await this.channel.assertQueue(QUEUES.ORDER_CREATED, { durable: true });

    this.logger.log('Connected to RabbitMQ');
  }

  publish(queue: string, payload: object): void {
    // RabbitMQ only stores bytes, so we turn the object into JSON, then into a Buffer
    const body = Buffer.from(JSON.stringify(payload));
    this.channel.sendToQueue(queue, body);
    this.logger.log(`Published to "${queue}": ${body.toString()}`);
  }

  async consume<T>(
    queue: string,
    handler: (payload: T) => Promise<void>,
  ): Promise<void> {
    await this.channel.consume(
      queue,
      (msg) => {
        if (!msg) return; // RabbitMQ cancelled this consumer (e.g. queue deleted)
        // Safe because handleMessage catches every error itself.
        void this.handleMessage(queue, msg, handler);
      },
      // Auto-ack: RabbitMQ deletes the message the moment it hands it to us.
      { noAck: true },
    );
    this.logger.log(`Consuming from "${queue}"`);
  }

  private async handleMessage<T>(
    queue: string,
    msg: ConsumeMessage,
    handler: (payload: T) => Promise<void>,
  ): Promise<void> {
    try {
      // Bytes -> string -> object (the reverse of publish). Inside try: bad JSON must not crash the worker.
      const payload = JSON.parse(msg.content.toString()) as T;
      await handler(payload);
    } catch (err) {
      // For now we only log. The message is already gone (noAck) — Lesson 6.
      this.logger.error(
        `Handler failed on "${queue}": ${(err as Error).message}`,
      );
    }
  }
}
