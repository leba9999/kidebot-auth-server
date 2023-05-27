import randomstring from "randomstring";
import Variants from "../../interfaces/Variants";
import AccessControlMemberships from "../../interfaces/AccessControlMemberships";
import { Product } from "../../interfaces/Product";

export default class VariantBuilder {
  date: Date;
  startDate!: Date;
  endDate!: Date;

  variant!: Variants;
  memberships: AccessControlMemberships[];
  product!: Product;

  constructor(date: Date) {
    this.date = date;
    this.memberships = [];
  }
  addMembership(membership: AccessControlMemberships) {
    this.memberships.push(membership);
  }
  setStartDate(startDate: Date) {
    this.startDate = startDate;
  }
  setEndDate(endDate: Date) {
    this.endDate = endDate;
  }
  setProduct(product: Product) {
    this.product = product;
  }
  build(): Variants {
    if (!this.startDate) {
      this.startDate = this.date; // today if not set
    }
    if (!this.endDate) {
      this.endDate = new Date(this.date.getTime() + 86400000 * 2); // 2 days
    }
    if (!this.product) {
      throw new Error("Product not set");
    }
    let availibility = Math.floor(Math.random() * 101);
    this.variant = {
      accessControlMemberships: this.memberships,
      availability: availibility,
      contentsMemberships: [],
      currencyCode: "EUR",
      dateActualFrom: null,
      dateActualUntil: null,
      dateCreated: this.date,
      dateModified: this.date,
      dateSalesFrom: this.startDate || this.date,
      dateSalesUntil: this.endDate,
      description: `{\"fi\":\"<p>${randomstring.generate(
        20
      )}</p>\",\"en\":\"<p>${randomstring.generate(
        20
      )}</p>\",\"sv\":\"<p>${randomstring.generate(20)}</p>\"}`,
      favoritedTimes: 0,
      id: randomstring.generate(36),
      ingress: `{\"fi\":\"<p>${randomstring.generate(
        20
      )}</p>\",\"en\":\"<p>${randomstring.generate(
        20
      )}</p>\",\"sv\":\"<p>${randomstring.generate(20)}</p>\"}`,
      inventoryId: randomstring.generate(36),
      isProductVariantActive: true,
      isProductVariantHakaAuthenticationRequired: false,
      isProductVariantMarkedAsOutOfStock: availibility ? false : true,
      isProductVariantTransferable: true,
      isProductVariantVisible: true,
      linkedProductVariants: [],
      mediaFilename:
        "xl_3d384ecbbe2683ce749f3af54146ef6909904603938e6d86ed72c8f5.jpeg",
      name: randomstring.generate(22),
      notesInstructions: "",
      pricePerItem: this.product.maxPrice?.eur,
      productId: this.product.id,
      productType: this.product.productType,
      productVariantMaximumItemQuantityPerUser: 5,
      productVariantMaximumReservableQuantity: 5,
      productVariantMinimumReservableQuantity: 1,
      requiredInventoryIdReservations: [],
      salesEnded: null,
      salesOngoing: null,
      salesStarted: null,
      vat: 0,
    };

    return this.variant;
  }
  getVariant(): Variants {
    if (!this.variant) {
      this.build();
    }
    return this.variant;
  }
}
