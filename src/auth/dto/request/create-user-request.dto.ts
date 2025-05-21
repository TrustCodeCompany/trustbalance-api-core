export class CreateUserRequestDto {
  readonly name!: string;
  readonly lastName!: string;
  readonly ruc!: string;
  readonly email!: string;
  roleIds!: string[];
}
