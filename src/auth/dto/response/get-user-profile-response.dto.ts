export class GetUserProfileResponseDTO {
  readonly name!: string;
  readonly lastName!: string;
  readonly imageUrl!: string;
  readonly email!: string;
  readonly roles!: { name: string }[];
  readonly isActive!: boolean;
  readonly subscriptionName!: string;

  constructor(transformedUser: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    this.name = transformedUser.name;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    this.lastName = transformedUser.lastName;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    this.imageUrl = transformedUser.imageUrl;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    this.email = transformedUser.email;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    this.roles = transformedUser.roles.map((role: any) => ({ name: role.name }));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    this.isActive = transformedUser.isActive;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.subscriptionName =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      transformedUser.company?.subscriptions?.find((sub: any) => sub.isActive)?.subscription.name ||
      null;
  }
}
