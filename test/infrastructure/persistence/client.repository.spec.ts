import { Test, TestingModule } from '@nestjs/testing';
import { ClientRepository } from '../../../src/infrastructure/persistence/client.repository';
import { DataSource, Repository } from 'typeorm';
import { ClientEntityMapper } from '../../../src/infrastructure/mappers/client-entity.mapper';
import { ClientEntity } from '../../../src/infrastructure/persistence/entities/client.entity';
import { CompanyEntity } from '../../../src/infrastructure/persistence/entities/company.entity';
import { Client } from '../../../src/domain/entities/client.entity';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';

describe('ClientRepository', () => {
  let repository: ClientRepository;
  let clientRepository: Repository<ClientEntity>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let dataSource: DataSource;
  let mapper: ClientEntityMapper;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const mockClientEntity = {
    id: 1,
    name: 'Test Client',
    ruc: '12345678901',
    email: 'test@example.com',
    company: { id: 1 } as CompanyEntity,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as ClientEntity;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const mockClient = {
    id: 1,
    name: 'Test Client',
    ruc: '12345678901',
    email: 'test@example.com',
    companyId: 1,
  } as Client;

  const mockClientEntityList = [
    { ...mockClientEntity, id: 1, name: 'Client 1' },
    { ...mockClientEntity, id: 2, name: 'Client 2' },
  ] as unknown as ClientEntity[];

  const mockClientList = [
    { ...mockClient, id: 1, name: 'Client 1' },
    { ...mockClient, id: 2, name: 'Client 2' },
  ] as unknown as Client[];

  // configuración antes de cada prueba
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientRepository,
        ClientEntityMapper,
        {
          provide: getRepositoryToken(ClientEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(mockClientEntity),
            find: jest.fn().mockResolvedValue(mockClientEntityList),
            findOne: jest.fn().mockResolvedValue(mockClientEntity),
            update: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: getDataSourceToken(),
          useValue: {
            createQueryRunner: jest.fn().mockReturnValue({
              connect: jest.fn(),
              startTransaction: jest.fn(),
              commitTransaction: jest.fn(),
              rollbackTransaction: jest.fn(),
              release: jest.fn(),
              manager: { save: jest.fn() },
            }),
          },
        },
      ],
    }).compile();

    repository = module.get<ClientRepository>(ClientRepository);
    clientRepository = module.get<Repository<ClientEntity>>(getRepositoryToken(ClientEntity));
    dataSource = module.get<DataSource>(getDataSourceToken());
    mapper = module.get<ClientEntityMapper>(ClientEntityMapper);

    jest.clearAllMocks();
  });

  // pruebas individuales
  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  // agrupaciones por métodos
  describe('create', () => {
    it('should save a client entity and return the mapped domain client', async () => {
      jest.spyOn(mapper, 'toEntity').mockReturnValue(mockClientEntity);
      jest.spyOn(mapper, 'toDomain').mockReturnValue(mockClient);

      const result = await repository.create(mockClient);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mapper.toEntity).toHaveBeenCalledWith(mockClient);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(clientRepository.save).toHaveBeenCalledWith(mockClientEntity);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mapper.toDomain).toHaveBeenCalledWith(mockClientEntity);
      expect(result).toEqual(mockClient);
    });
  });

  describe('findAll', () => {
    it('should find all client entities and return a list of mapped domain clients', async () => {
      jest
        .spyOn(mapper, 'toDomain')
        .mockReturnValueOnce(mockClientList[0])
        .mockReturnValueOnce(mockClientList[1]);

      const result = await repository.findAll();

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(clientRepository.find).toHaveBeenCalled();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mapper.toDomain).toHaveBeenCalledTimes(2);
      expect(result).toEqual(mockClientList);
    });

    it('should return an empty array if no clients are found', async () => {
      jest.spyOn(clientRepository, 'find').mockResolvedValue([]);
      const result = await repository.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('should find a client entity by id and return the mapped domain client', async () => {
      jest.spyOn(clientRepository, 'findOne').mockResolvedValue(mockClientEntity);
      jest.spyOn(mapper, 'toDomain').mockReturnValue(mockClient);

      const result = await repository.findById(1);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(clientRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mapper.toDomain).toHaveBeenCalledWith(mockClientEntity);
      expect(result).toEqual(mockClient);
    });

    it('should return null if no client entity is found with the given id', async () => {
      jest.spyOn(clientRepository, 'findOne').mockResolvedValue(null);
      const result = await repository.findById(99);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a client entity by id', async () => {
      jest.spyOn(mapper, 'toEntity').mockReturnValue(mockClientEntity);

      await repository.update(1, mockClient);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mapper.toEntity).toHaveBeenCalledWith(mockClient);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(clientRepository.update).toHaveBeenCalledWith(1, mockClientEntity);
    });
  });

  describe('findByCompany', () => {
    it('should find client entities by company id and return a list of mapped domain clients', async () => {
      jest.spyOn(clientRepository, 'find').mockResolvedValue(mockClientEntityList);
      jest
        .spyOn(mapper, 'toDomain')
        .mockReturnValueOnce(mockClientList[0])
        .mockReturnValueOnce(mockClientList[1]);

      const result = await repository.findByCompany(1);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(clientRepository.find).toHaveBeenCalledWith({ where: { company: { id: 1 } } });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mapper.toDomain).toHaveBeenCalledTimes(2);
      expect(result).toEqual(mockClientList);
    });

    it('should return an empty array if no clients are found for the given company id', async () => {
      jest.spyOn(clientRepository, 'find').mockResolvedValue([]);
      const result = await repository.findByCompany(99);
      expect(result).toEqual([]);
    });
  });

  describe('findByRuc', () => {
    it('should find a client entity by ruc and return the mapped domain client', async () => {
      jest.spyOn(clientRepository, 'findOne').mockResolvedValue(mockClientEntity);
      jest.spyOn(mapper, 'toDomain').mockReturnValue(mockClient);

      const result = await repository.findByRuc('12345678901');

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(clientRepository.findOne).toHaveBeenCalledWith({ where: { ruc: '12345678901' } });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mapper.toDomain).toHaveBeenCalledWith(mockClientEntity);
      expect(result).toEqual(mockClient);
    });

    it('should return null if no client entity is found with the given ruc', async () => {
      jest.spyOn(clientRepository, 'findOne').mockResolvedValue(null);
      const result = await repository.findByRuc('99999999999');
      expect(result).toBeNull();
    });
  });
});
