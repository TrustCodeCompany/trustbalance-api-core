export class ResetPasswordResponseDto {
  readonly message!: string;

  constructor(message: string) {
    this.message = message;
  }
}
