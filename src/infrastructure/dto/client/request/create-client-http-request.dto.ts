import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength, IsInt, Matches } from 'class-validator';

export class CreateClientHttpRequestDto {
  @ApiProperty({ example: 'TrustBalance' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Expose()
  readonly razonSocial!: string;

  @ApiProperty({ example: '21547854526' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{11}$/, { message: 'El RUC debe ser exactamente 11 dígitos' })
  @Expose()
  readonly ruc!: string;

  @ApiProperty({ example: 'Chicama Y-15' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @Expose()
  readonly address!: string;

  @ApiProperty({ example: 'StrongP@ss123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  /* @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número o carácter especial',
  }) */
  @Expose()
  readonly password!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  @Expose()
  readonly companyId!: number;
}