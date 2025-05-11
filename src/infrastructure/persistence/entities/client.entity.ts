import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';

@Entity('clients')
export class ClientEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  @Expose()
  id?: number;

  @Column({ nullable: false })
  @Expose()
  razonSocial!: string;

  @Column({ nullable: false })
  @Expose()
  ruc!: string;

  @Column({ nullable: false })
  @Expose()
  password!: string;

  @Column({ nullable: true })
  @Expose()
  address!: string;

  @ManyToOne(() => CompanyEntity, (company) => company.clients, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'companyId' })
  @Expose()
  company!: CompanyEntity;

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
