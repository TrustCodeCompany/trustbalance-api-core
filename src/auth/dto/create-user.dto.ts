import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @Expose()
  readonly name!: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly lastName!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  @Expose()
  readonly ruc!: string;

  @IsNotEmpty()
  @IsEmail()
  @Expose()
  readonly email!: string;

  @Expose()
  roleIds!: string[];
}
