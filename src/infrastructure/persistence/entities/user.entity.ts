import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { RoleEntity } from './role.entity';
import { CompanyEntity } from './company.entity';

@Entity('users')
export class UserEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  @Expose()
  id?: number;

  @Column()
  @Expose()
  name!: string;

  @Column({ unique: true })
  @Expose()
  email!: string;

  @Column()
  @Expose()
  password!: string;

  @Column()
  @Expose()
  lastName!: string;

  @Column({ default: null})
  @Expose()
  imageUrl?: string;

  @ManyToMany(() => RoleEntity, (role) => role.users, {
    eager: true,
  })
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    }
  })
  @Expose()
  roles!: RoleEntity[];

  @ManyToOne(() => CompanyEntity, (company) => company.users)
  @Expose()
  company!: CompanyEntity | null;

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
