import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { CreateClientUseCase } from 'src/application/use-cases/create-client.usecase';
import { ClientEntityMapper } from 'src/infrastructure/mappers/client-entity.mapper';
import { ClientRepository } from 'src/infrastructure/persistence/client.repository';
import { ClientEntity } from 'src/infrastructure/persistence/entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

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
