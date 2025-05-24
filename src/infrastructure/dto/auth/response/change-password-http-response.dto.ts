import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ChangePasswordHttpResponseDto {
  @ApiProperty({
    description: 'identificador de operacion',
    example: 'fbad5ff1-3485-4592-aa6b-52f888a36515',
    type: 'string',
  })
  @Expose()
  operationId!: string;

  @ApiProperty({
    description: 'mensaje de resultado de la operacion',
    example: 'Actualizacion satifactoria',
    type: 'string',
  })
  @Expose()
  message!: string;

  @ApiProperty({
    description: 'fecha y hora de la operacion',
    example: '2025-05-23T18:36:39.065Z',
    type: 'string',
  })
  @Expose()
  timeStamp!: string;
}
