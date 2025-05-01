import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { UserEntity } from './user.entity';
import { ClientEntity } from './client.entity';
import { CompanySubscriptionEntity } from './companySubscription.entity';

@Entity('companies')
export class CompanyEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  @Expose()
  id?: number;

  @Column({ nullable: true })
  @Expose()
  name!: string;

  @Column({ nullable: true })
  @Expose()
  ruc!: string;

  //@OneToOne(() => UserEntity, (user) => user.company) // specify inverse side as a second parameter
  @OneToMany(() => UserEntity, (user) => user.company)
  @Expose()
  users!: UserEntity[];

  @OneToMany(() => ClientEntity, (client) => client.company, {
    eager: true,
  })
  @Expose()
  clients!: ClientEntity[];

  @OneToMany(
    () => CompanySubscriptionEntity,companySubscription => companySubscription.company)
  subscriptions!: CompanySubscriptionEntity[];

  @Column({ default: true })
  @Expose()
  isActive?: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Expose()
  createdAt?: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Expose()
  updatedAt?: Date;
}
