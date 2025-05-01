import { ClientData } from '../data/client.data';
import { Expose, Type } from 'class-transformer';
import { CompanySubscriptionEntity } from 'src/infrastructure/persistence/entities/companySubscription.entity';

export class Company {
  @Expose()
  readonly id: number;

  @Expose()
  readonly name: string;

  @Expose()
  readonly ruc: string;

  @Expose()
  readonly clients!: ClientData[];

  @Type(() => CompanySubscriptionEntity)
  @Expose()
  readonly subscriptions: CompanySubscriptionEntity[];

  constructor(id: number, name: string, ruc: string) {
    this.id = id;
    this.name = name;
    this.ruc = ruc;
  }

  public static create(name: string, ruc: string): Company {
    return new Company(0, name, ruc);
  }

  public static createWithId(id: number): Company {
    return new Company(id, '', '');
  }
}
