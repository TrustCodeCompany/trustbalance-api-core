import { IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordHttpRequestDto {
  @ApiProperty({
    example: 'Abc123456',
    description: 'nueva contraseña',
    type: String,
  })
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-z])/, { message: 'La contraseña debe tener al menos una letra minúscula' })
  @Matches(/(?=.*[A-Z])/, { message: 'La contraseña debe tener al menos una letra mayúscula' })
  @Matches(/(?=.*\d)/, { message: 'La contraseña debe tener al menos un número' })
  newPassword: string;

  @ApiProperty({
    example: 'Abc123456',
    description: 'confirmacion de nueva contraseña',
    type: String,
  })
  @IsString()
  confirmNewPassword: string;
}
