import { ClientData } from './client.data';
import { Expose } from 'class-transformer';
import { Company } from '../entities/company.entity';

export class ClientsByCompanyData {
  @Expose()
  id?: number;
  @Expose()
  ruc?: string;
  @Expose()
  name?: string;
  @Expose()
  clients?: ClientData[];

  static fromCompany(company: Company): ClientsByCompanyData {
    const data = new ClientsByCompanyData();
    data.id = company.id;
    data.ruc = company.ruc;
    data.name = company.name;
    data.clients = company.clients.map((client) =>
      ClientData.fromClient(<ClientData>client),
    );
    return data;
  }
}
