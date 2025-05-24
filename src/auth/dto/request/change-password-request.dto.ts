import { IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-z])/, { message: 'La contraseña debe tener al menos una letra minúscula' })
  @Matches(/(?=.*[A-Z])/, { message: 'La contraseña debe tener al menos una letra mayúscula' })
  @Matches(/(?=.*\d)/, { message: 'La contraseña debe tener al menos un número' })
  newPassword: string;

  @IsString()
  confirmNewPassword: string;
}
