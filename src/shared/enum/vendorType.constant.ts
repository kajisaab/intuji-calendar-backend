import { EnumType } from './enumType';

export class VendorType extends EnumType<VendorType> {
  public static readonly SERVICE_PROVIDER = new VendorType('SERVICE_PROVIDER', 'Service Provider');
  public static readonly PRODUCT_SELLER = new VendorType('PRODUCT_SELLER', 'Product Seller');
  public static readonly PRODUCT_SERVICE_PROVIDER = new VendorType('PRODUCT_SERVICE_PROVIDER', 'Product Service Provider');

  constructor(
    public readonly name: string,
    public readonly displayName: string
  ) {
    super(name);
    this.displayName = displayName;
  }

  public static getValues(): VendorType[] {
    return [this.PRODUCT_SELLER, this.SERVICE_PROVIDER, this.PRODUCT_SERVICE_PROVIDER];
  }

  public static getByName(name: string): { name: string; displayName: string } {
    const result = this.getValues().filter((item) => item.name === name);

    if (result.length > 0) {
      return result[0];
    }

    return { name: '', displayName: '' };
  }
}
