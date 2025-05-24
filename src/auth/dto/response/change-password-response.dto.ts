import * as crypto from 'crypto';

export class ChangePasswordResponseDto {
  operationId!: string;
  message!: string;
  timeStamp!: Date;

  constructor(message: string) {
    this.operationId = crypto.randomUUID();
    this.message = message;
    this.timeStamp = new Date();
  }
}
