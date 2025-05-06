import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetUserProfileResponseDTO {
  @Expose()
  name!: string;

  @Expose()
  lastName!: string;

  @Expose()
  imageUrl!: string;

  @Expose()
  email!: string;

  @Expose()
  roles!: { name: string }[];

  @Expose()
  isActive!: boolean;

  @Expose()
  subscriptionName!: string;
}
