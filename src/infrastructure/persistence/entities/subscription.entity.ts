import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subscriptions')
export class SubscriptionEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  @Expose()
  id?: number;

  @Column()
  @Expose()
  name!: string;

  @Column()
  @Expose()
  price!: number;

  @Column()
  @Expose()
  duration!: number;

  @Column({ type: 'json', nullable: true })
  @Expose()
  features!: string[];

  @Column({ default: true })
  @Expose()
  isActive?: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Expose()
  createdAt?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Expose()
  updatedAt?: Date;
}
