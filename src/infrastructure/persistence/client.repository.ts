import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ClientRepositoryPort } from 'src/domain/repositories/client.repository.interface';
import { DataSource, Repository } from 'typeorm';
import { ClientEntityMapper } from '../mappers/client-entity.mapper';
import { ClientEntity } from './entities/client.entity';
import { Client } from 'src/domain/entities/client.entity';
import { CompanyEntity } from './entities/company.entity';

@Injectable()
export class ClientRepository implements ClientRepositoryPort {
  private datasource: DataSource;

  constructor(
    @InjectRepository(ClientEntity)
    private repository: Repository<ClientEntity>,
    @InjectDataSource()
    private dataSourceInject: DataSource,
    private mapper: ClientEntityMapper,
  ) {
    this.datasource = dataSourceInject;
  }

  async create(client: Client): Promise<Client> {
    const clientEntity: ClientEntity = this.mapper.toEntity(client);
    const savedEntity: ClientEntity = await this.repository.save(clientEntity);
    return this.mapper.toDomain(savedEntity);
  }

  async findAll(): Promise<Client[]> {
    const res: ClientEntity[] = await this.repository.find();
    return res.map((client) => this.mapper.toDomain(client));
  }

  async findById(id: number): Promise<Client | null> {
    const findById: ClientEntity | null = await this.repository.findOne({
      where: {
        id: id,
      },
    });
    return this.mapper.toDomain(findById);
  }

  async update(id: number, client: Client): Promise<void> {
    const clientEntity: ClientEntity = this.mapper.toEntity(client);
    await this.repository.update(id, clientEntity);
    return Promise.resolve();
  }

  async findByCompany(id: number): Promise<Client[] | null> {
    const company: CompanyEntity = new CompanyEntity();
    company.id = id;
    const res: ClientEntity[] = await this.repository.find({
      where: {
        company: company,
      },
    });

    return res.map((client) => this.mapper.toDomain(client));
  }

  async findByRuc(ruc: string): Promise<Client | null> {
    const findById: ClientEntity | null = await this.repository.findOne({
      where: {
        ruc: ruc,
      },
    });
    return this.mapper.toDomain(findById);
  }
}
