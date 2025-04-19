import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AuthResponseDto {
  @Expose()
  traceId!: string;

  @Expose()
  results!: {
    status: string;
    message: string;
    token: string;
  };
}
