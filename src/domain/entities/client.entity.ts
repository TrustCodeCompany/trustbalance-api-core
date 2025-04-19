import { Expose, Type } from 'class-transformer';
import { Company } from './company.entity';

export class Client {
  @Expose()
  readonly id?: number;

  @Expose()
  readonly razonSocial!: string;

  @Expose()
  readonly ruc!: string;

  @Expose()
  readonly address!: string;

  @Expose()
  readonly password!: string;

  @Type(() => Company)
  @Expose()
  readonly company!: Company;

  constructor(
    id: number,
    razonSocial: string,
    ruc: string,
    address: string,
    password: string,
    company: Company,
  ) {
    this.id = id;
    this.razonSocial = razonSocial;
    this.ruc = ruc;
    this.address = address;
    this.password = password;
    this.company = company;
  }

  public static create(
    razonSocial: string,
    ruc: string,
    address: string,
    password: string,
    company: Company,
  ): Client {
    return new Client(0, razonSocial, ruc, address, password, company);
  }
}
