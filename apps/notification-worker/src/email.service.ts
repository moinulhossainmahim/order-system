import { Injectable, Logger } from '@nestjs/common';

const DELAY_MS = 3000;
const FAILURE_RATE = 0.3;

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendOrderConfirmation(email: string, orderId: string): Promise<void> {
    this.logger.log(`Sending confirmation for order ${orderId} to ${email}...`);
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

    if (Math.random() < FAILURE_RATE) {
      throw new Error('Email provider timeout');
    }
    this.logger.log(`Email sent for order ${orderId}`);
  }
}
