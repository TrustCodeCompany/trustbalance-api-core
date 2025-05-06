import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../infrastructure/persistence/entities/client.entity';
import { CreateClientUseCase } from '../application/use-cases/create-client.usecase';
import { ClientEntityMapper } from '../infrastructure/mappers/client-entity.mapper';
import { ClientRepository } from '../infrastructure/persistence/client.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity]), // Registra la entidad aquí
  ],

  controllers: [ClientController],

  providers: [
    ClientService,
    CreateClientUseCase,
    ClientEntityMapper,
    {
      provide: 'ClientRepository',
      useClass: ClientRepository,
    },
  ],
})
export class ClientModule {}
