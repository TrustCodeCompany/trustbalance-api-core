import { Injectable } from '@nestjs/common';
import { RucAlreadyExistsException } from '../exceptions/ruc-already-exist.exception';
import { ClientService } from '../../client/client.service';
import { CreateClientRequestDto } from '../../client/dto/create-client-request.dto';
import { OperationResult } from '../../domain/entities/OperationResult';
import { Company } from '../../domain/entities/company.entity';
import { Client } from '../../domain/entities/client.entity';

@Injectable()
export class CreateClientUseCase {
  constructor(private clientService: ClientService) {}

  async execute(clientData: CreateClientRequestDto): Promise<OperationResult> {
    /* if (await this.clientService.clientExistByRuc(clientData.ruc)) {
      throw new Error(
        'Client with this RUC already exists. Please use a different RUC.',
      );
    } */

    if (await this.clientService.clientExistByRuc(clientData.ruc)) {
      throw new RucAlreadyExistsException(clientData.ruc);
    }

    const company: Company = Company.createWithId(clientData.companyId);

    const client: Client = Client.create(
      clientData.razonSocial,
      clientData.ruc,
      clientData.address,
      clientData.password,
      company,
    );

    await this.clientService.createClient(client);

    return OperationResult.success('Client created successfully');
  }
}
