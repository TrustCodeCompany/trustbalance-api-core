import { BadRequestException } from '@nestjs/common';

export class RucAlreadyExistsException extends BadRequestException {
  constructor(ruc: string) {
    super(`${ruc} already exists`);
  }
}
