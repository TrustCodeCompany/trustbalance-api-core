import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetUserProfileHttpResponseDTO {
  @ApiProperty({ example: 'piero' })
  @Expose()
  name!: string;

  @ApiProperty({ example: 'Becerra Chang' })
  @Expose()
  lastName!: string;

  @ApiProperty({ example: 'http:/piero33&img/images.com' })
  @Expose()
  imageUrl!: string;

  @ApiProperty({ example: 'piero33@gmail.com' })
  @Expose()
  email!: string;

  @ApiProperty({
    description: 'Listado de roles del usuario',
    isArray: true,                             
    type: Object,                              
    example: [
      { name: 'MODERATOR' },
      { name: 'USER' }
    ]                                          
  })
  @Expose()
  roles!: { name: string }[];

  @ApiProperty({ example: 'true' })
  @Expose()
  isActive!: boolean;

  @ApiProperty({ example: 'FREE' })
  @Expose()
  subscriptionName!: string;
}
