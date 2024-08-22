/* eslint-disable @typescript-eslint/member-delimiter-style */

import { EnumType } from './enumType';

export class UserType extends EnumType<UserType> {
  public static readonly MAKER = new UserType('MAKER', 'Maker');
  public static readonly VENDOR = new UserType('VENDOR', 'Vendor');

  constructor(
    public readonly name: string,
    public readonly displayName: string
  ) {
    super(name);
    this.displayName = displayName;
  }

  public static getValues(): UserType[] {
    return [this.MAKER, this.VENDOR];
  }

  public static getByName(name: string): { name: string; displayName: string } {
    const results = this.getValues().filter((item) => item.name === name);
    if (results.length > 0) {
      return results[0];
    }
    return { name: '', displayName: '' };
  }
}
