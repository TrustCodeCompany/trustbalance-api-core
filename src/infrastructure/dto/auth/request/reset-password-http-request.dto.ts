import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordHttpRequestDto {
  @ApiProperty({
    example: '131231231',
    description: 'token valido',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  readonly token: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial',
  })
  readonly newPassword: string;
}
