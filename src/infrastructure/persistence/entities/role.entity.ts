import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { Expose } from 'class-transformer';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id?: number;

  @Column({ unique: true })
  @Expose()
  name!: string;

  @Column({ nullable: true })
  @Expose()
  description!: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users!: UserEntity[];

  @Column({ type: 'json', nullable: true })
  @Expose()
  permissions!: string[];

  @Column({ default: true })
  @Expose()
  isActive?: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;
}
