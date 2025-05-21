import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginUserHttpResponsetDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @Expose()
  operationId!: string;

  @ApiProperty({ example: 'Login Successful' })
  @Expose()
  readonly message!: string;

  @ApiProperty({ example: '2025-05-14T15:23:42.123Z' })
  @Expose()
  readonly timeStamp!: Date;

  @ApiProperty({ example: 'Bearer Dfggfg4524234%&&dfdf#$dfdfdf%QBVC' })
  @Expose()
  readonly token!: string;
}
