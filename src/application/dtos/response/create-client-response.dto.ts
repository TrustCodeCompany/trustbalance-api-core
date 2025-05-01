import { Expose } from "class-transformer";

export class CreateClientResponsetDto {

    @Expose()
    readonly message!: string;

    @Expose()
    readonly operationId!: string;

}
