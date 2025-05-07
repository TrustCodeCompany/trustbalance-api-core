import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UserRepositoryPort } from '../../domain/repositories/user.repository.interface';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { User } from '../../domain/entities/user.entity';
import { UserEntityMapper } from '../mappers/user-entity.mapper';
import { CompanyEntity } from './entities/company.entity';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  private datasource: DataSource;

  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    @InjectDataSource()
    private dataSourceInject: DataSource,
    private mapper: UserEntityMapper,
  ) {
    this.datasource = dataSourceInject;
  }

  async create(user: User): Promise<User> {
    const queryRunner: QueryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userEntity: UserEntity = this.mapper.toEntity(user);
      const companyEntityToSave: CompanyEntity = queryRunner.manager.create(
        CompanyEntity,
        userEntity.company ?? {},
      );
      const companyEntitySaved: CompanyEntity | null =
        await queryRunner.manager.save(companyEntityToSave);

      userEntity.company = companyEntitySaved;
      const userEntityToSave: UserEntity = queryRunner.manager.create(
        UserEntity,
        userEntity,
      );
      const userEntitySaved: UserEntity =
        await queryRunner.manager.save(userEntityToSave);

      const rolesIds: number[] = user.roles.map((role) => parseInt(role.id));

      if (rolesIds && rolesIds.length > 0) {
        // Verifica que haya roles para asignar
        const existingRelations = await queryRunner.manager
          .createQueryBuilder(UserEntity, 'usuario')
          .leftJoinAndSelect('usuario.roles', 'rol')
          .where('usuario.id = :userId', { userId: userEntitySaved.id })
          .getOne();

        const existingRoleIds =
          existingRelations?.roles.map((rol) => rol.id) || [];
        const newRoleIds = rolesIds.filter(
          (roleId) => !existingRoleIds.includes(roleId),
        );

        if (newRoleIds.length > 0) {
          await queryRunner.manager
            .getRepository(UserEntity)
            .createQueryBuilder()
            .relation(UserEntity, 'roles')
            .of(userEntitySaved)
            .add(newRoleIds);
        }
      }

      await queryRunner.commitTransaction();
      return this.mapper.toDomain(new UserEntity());
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error saving user:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const findByEmail: UserEntity | null = await this.repository.findOne({
        where: { email: email },
        relations: [
          'roles',
          'company',
          'company.subscriptions',
          'company.subscriptions.subscription',
        ],
      });
      return this.mapper.toDomain(findByEmail);
    } catch (error) {
      console.error('Error findByEmail user:', error);
      throw error;
    }
  }

  /*async save(auth: Auth): Promise<void> {
    // Mapear de entidad de dominio (Auth) a entidad de base de datos (AuthEntity)
    const authEntity = classToPlain(auth) as AuthEntity;
    await this.authRepo.save(authEntity);
  }*/
}
