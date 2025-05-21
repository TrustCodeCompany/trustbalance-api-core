import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserHttpRequestDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  readonly email!: string;

  @ApiProperty({ example: '*******' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly password!: string;
}
