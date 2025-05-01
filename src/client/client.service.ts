import { Inject, Injectable } from '@nestjs/common';
import { ClientRepositoryPort } from 'src/domain/repositories/client.repository.interface';
import { Client } from 'src/domain/entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepositoryPort,
  ) {}

  async clientExistByRuc(ruc: string): Promise<Boolean> {
    return (await this.clientRepository.findByRuc(ruc)) != null;
  }

  async createClient(client: Client): Promise<void> {
    await this.clientRepository.create(client);
  }

  /* create(createClientRequestDto: CreateClientRequestDto) {
    return 'This action adds a new client';
  } */

  /* findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  } */
}
