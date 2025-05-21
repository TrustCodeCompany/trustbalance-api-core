import * as crypto from 'crypto';

export class CreateUserResponsetDto {
  operationId!: string;
  readonly message!: string;
  readonly timeStamp!: Date;

  constructor() {
    this.operationId = crypto.randomUUID();
    this.message = 'Successful Account Creation';
    this.timeStamp = new Date();
  }
}
