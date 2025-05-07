import { Expose } from 'class-transformer';
import { ClientData } from './client.data';

export class CompanyData {
  @Expose()
  id?: number;

  @Expose()
  name?: string;

  @Expose()
  ruc?: string;

  @Expose()
  clients?: ClientData[];
}
