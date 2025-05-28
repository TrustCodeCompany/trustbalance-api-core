export class CheckEmailResponseDto {
  readonly message!: string;

  constructor(message: string) {
    this.message = message;
  }
}
