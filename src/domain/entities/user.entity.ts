import { Role } from './role.entity';
import { Company } from './company.entity';
import { Expose, Type } from 'class-transformer';

export class User {
  @Expose()
  readonly id: number;

  @Expose()
  readonly name: string;

  @Expose()
  lastName!: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly password: string;

  @Type(() => Role)
  @Expose()
  readonly roles: Role[];

  @Type(() => Company)
  @Expose()
  readonly company: Company;

  constructor(
    id: number,
    email: string,
    name: string,
    lastName: string,
    password: string,
    roles: Role[],
    company: Company,
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.lastName = lastName;
    this.password = password;
    this.roles = roles;
    this.company = company;
  }

  public static create(
    email: string,
    name: string,
    lastName: string,
    password: string,
    roles: Role[],
    company: Company,
  ): User {
    return new User(0, email, name, lastName, password, roles, company);
  }
}
