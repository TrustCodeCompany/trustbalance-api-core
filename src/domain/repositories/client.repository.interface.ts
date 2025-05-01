import { Client } from "../entities/client.entity";

export interface ClientRepositoryPort {
    findById(id: number): Promise<Client | null>;
    findByRuc(ruc: string): Promise<Client | null>;
    findByCompany(id: number): Promise<Client[] | null>;
    findAll(): Promise<Client[]>;
    create(client: Client): Promise<Client>;
    update(id: number, client: Client): Promise<void>;
}
