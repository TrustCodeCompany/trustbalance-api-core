import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'ricardo',
    type: String,
    description: 'nombre del usuario',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @Expose()
  readonly name!: string;

  @ApiProperty({ example: 'bueno balbis' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly lastName!: string;

  @ApiProperty({ example: '1111111111' })
  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  @Expose()
  readonly ruc!: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  readonly email!: string;

  @Expose()
  roleIds!: string[];
}
