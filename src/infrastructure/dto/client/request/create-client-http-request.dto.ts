import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateClientHttpRequestDto {
  @ApiProperty({ example: 'TrustBalance' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly razonSocial!: string;

  @ApiProperty({ example: '11111111111' })
  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  @Expose()
  readonly ruc!: string;

  @ApiProperty({ example: 'Chicama X-15' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @Expose()
  readonly address!: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly password!: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  readonly companyId!: number;
}
