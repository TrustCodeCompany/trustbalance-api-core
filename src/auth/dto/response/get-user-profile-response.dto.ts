export class GetUserProfileResponseDTO {
  readonly name!: string;
  readonly lastName!: string;
  readonly imageUrl!: string;
  readonly email!: string;
  readonly roles!: { name: string }[];
  readonly isActive!: boolean;
  readonly subscriptionName!: string;

  constructor(transformedUser: any) {
    this.name = transformedUser.name;
    this.lastName = transformedUser.lastName;
    this.imageUrl = transformedUser.imageUrl;
    this.email = transformedUser.email;
    this.roles = transformedUser.roles.map((role: any) => ({ name: role.name }));
    this.isActive = transformedUser.isActive;
    this.subscriptionName =
      transformedUser.company?.subscriptions?.find(
        (sub: any) => sub.isActive,
      )?.subscription.name || null;
  }
}
