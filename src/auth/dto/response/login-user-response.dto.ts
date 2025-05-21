import * as crypto from 'crypto';

export class LoginUserResponsetDto {
  operationId!: string;
  readonly message!: string;
  readonly timeStamp!: Date;
  readonly token!: string;

  constructor(token: string) {
    this.operationId = crypto.randomUUID();
    this.message = 'Login Successful';
    this.timeStamp = new Date();
    this.token = token;
  }
}
