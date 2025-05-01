import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { CreateClientRequestDto } from 'src/client/dto/create-client-request.dto';
import { Client } from 'src/domain/entities/client.entity';
import { Company } from 'src/domain/entities/company.entity';
import { OperationResult } from 'src/domain/entities/OperationResult';
import { RucAlreadyExistsException } from '../exceptions/ruc-already-exist.exception';

@Injectable()
export class CreateClientUseCase {
  constructor(private clientService: ClientService) {}

  async execute(clientData: CreateClientRequestDto): Promise<OperationResult> {
    /* if (await this.clientService.clientExistByRuc(clientData.ruc)) {
      throw new Error(
        'Client with this RUC already exists. Please use a different RUC.',
      );
    } */

    if ((await this.clientService.clientExistByRuc(clientData.ruc))) {
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
