import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'customer_email', type: 'varchar' })
  customerEmail: string;

  @Column({ name: 'product_name', type: 'varchar' })
  productName: string;

  @Column({ type: 'int' })
  quantity: number;

  // PENDING now; workers will change this later (CONFIRMED / FAILED)
  @Column({ type: 'varchar', length: 20, default: 'PENDING' })
  status: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
