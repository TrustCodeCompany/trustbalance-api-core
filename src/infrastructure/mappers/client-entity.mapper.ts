import { Injectable } from "@nestjs/common";
import { ClassTransformOptions, plainToClass } from "class-transformer";
import { ClientEntity } from "../persistence/entities/client.entity";
import { Client } from "src/domain/entities/client.entity";

@Injectable()
export class ClientEntityMapper {
    private readonly defaultOptions: ClassTransformOptions = {
        //excludeExtraneousValues: true,
        enableImplicitConversion: true
    };

    toDomain(clientEntity: ClientEntity | null): Client {
        return plainToClass(Client, clientEntity, this.defaultOptions);
    }

    toEntity(client: Client): ClientEntity {
        return plainToClass(ClientEntity, client, this.defaultOptions);
    }
}