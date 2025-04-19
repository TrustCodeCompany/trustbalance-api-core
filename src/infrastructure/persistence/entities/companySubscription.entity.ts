import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { SubscriptionEntity } from './subscription.entity';

@Entity('company_subscriptions')
export class CompanySubscriptionEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => CompanyEntity, (company) => company.subscriptions, {
    onDelete: 'CASCADE',
  })
  company!: CompanyEntity;

  @ManyToOne(() => SubscriptionEntity, { onDelete: 'CASCADE' })
  subscription!: SubscriptionEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startDate!: Date;

  @Column({ type: 'timestamp' })
  endDate!: Date;

  @Column({ default: true })
  isActive?: boolean;
}
