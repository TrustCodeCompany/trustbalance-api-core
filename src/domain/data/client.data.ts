import { Expose } from 'class-transformer';

export class ClientData {
  @Expose()
  id?: number;

  @Expose()
  razonSocial!: string;

  @Expose()
  ruc!: string;

  @Expose()
  address!: string;

  @Expose()
  password!: string;

  /*@Type(() => Company)
    @Expose()
    readonly company!: Company;*/

  // Método estático para transformar un objeto "client" a "ClientData"
  static fromClient(client: ClientData): ClientData {
    const clientData = new ClientData();
    clientData.id = client.id;
    clientData.razonSocial = client.razonSocial;
    clientData.ruc = client.ruc; // Asigna otras propiedades si es necesario
    clientData.address = client.address; // Asigna otras propiedades si es necesario
    clientData.password = client.password;
    return clientData;
  }

  /*constructor(
        id: number,
        razonSocial: string,
        ruc: string,
        address: string,
        password: string,
        //company: Company
    ) {
        this.id = id;
        this.razonSocial = razonSocial;
        this.ruc = ruc;
        this.address = address;
        this.password = password;
        //this.company = company;
    }*/
}
