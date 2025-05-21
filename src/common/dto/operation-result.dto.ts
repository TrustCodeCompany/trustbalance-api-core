import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { NotificationDto } from './notification.dto';

@ApiExtraModels(NotificationDto)
export class OperationResultDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({
    required: false,
    oneOf: [{ $ref: getSchemaPath(NotificationDto) }, { type: 'object' }],
  })
  data?: T;

  @ApiProperty({ required: false, type: [NotificationDto] })
  errors?: NotificationDto[];
}
