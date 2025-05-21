import * as crypto from 'crypto';

export class CreateClientResponsetDto {
  readonly operationId!: string;
  readonly message!: string;
  readonly timeStamp!: Date;

  constructor() {
    this.operationId = crypto.randomUUID();
    this.message = 'Client Created Successfully';
    this.timeStamp = new Date();
  }
}
