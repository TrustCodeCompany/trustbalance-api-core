export class Role {
  id!: string;
  name!: string;
  description?: string;
  permissions!: string[];
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  /*constructor(props: Partial<Role>) {
      Object.assign(this, props);
  }*/

  constructor(id: string) {
    this.id = id;
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }
}
