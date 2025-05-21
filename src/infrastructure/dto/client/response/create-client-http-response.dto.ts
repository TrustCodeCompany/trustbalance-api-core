import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateClientHttpResponsetDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @Expose()
  readonly operationId!: string;

  @ApiProperty({ example: 'Create Client Successful' })
  @Expose()
  readonly message!: string;

  @ApiProperty({ example: '2025-05-14T15:23:42.123Z' })
  @Expose()
  readonly timeStamp!: Date;
}
