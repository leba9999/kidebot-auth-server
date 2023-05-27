import randomstring from "randomstring";
import { Product } from "../../interfaces/Product";
import Company from "../../interfaces/Company";

export default class ProductBuilder {
  date: Date;
  startDate!: Date;
  endDate!: Date;
  freeTickets: boolean;

  product!: Product;
  company!: Company;

  constructor(date: Date) {
    this.date = date;
    this.freeTickets = false;
  }
  setCompany(company: Company) {
    this.company = company;
  }
  setStartDate(startDate: Date) {
    this.startDate = startDate;
  }
  setEndDate(endDate: Date) {
    this.endDate = endDate;
  }
  setFreeTickets(freeTickets: boolean) {
    this.freeTickets = freeTickets;
  }
  build(): Product {
    if (!this.startDate) {
      this.startDate = this.date; // today if not set
    }
    if (!this.endDate) {
      this.endDate = new Date(this.date.getTime() + 86400000 * 2); // 2 days
    }
    if (!this.company) {
      throw new Error("Company not set");
    }
    let rDLenght = Math.floor(Math.random() * 250) + 51; // description length 50-300
    this.product = {
      availability: Math.floor(Math.random() * 100) + 1,
      city: "Helsinki",
      companyId: this.company.id,
      country: "FI",
      dateActualFrom: this.startDate,
      dateActualUntil: this.endDate,
      dateCreated: this.date,
      dateModified: this.date,
      datePublishFrom: this.date,
      datePublishUntil: this.endDate,
      dateSalesFrom: this.startDate,
      dateSalesUntil: this.endDate,
      description: `{\"fi\":\"<p>${randomstring.generate(
        rDLenght
      )}</p>\\n<p>${randomstring.generate(
        rDLenght
      )}</p>\",\"en\":\"<p>${randomstring.generate(
        rDLenght
      )}</p>\\n<p>${randomstring.generate(
        rDLenght
      )}</p>\",\"sv\":\"<p>${randomstring.generate(
        rDLenght
      )}</p>\\n<p>${randomstring.generate(rDLenght)}</p>\"}`,
      favoritedTimes: Math.floor(Math.random() * 200) + 1,
      hasFreeInventoryItems: this.freeTickets,
      hasInventoryItems: true,
      id: randomstring.generate(36),
      ingress: `{\"fi\":\"${randomstring.generate(
        30
      )}\",\"en\":\"${randomstring.generate(
        30
      )}\",\"sv\":\"${randomstring.generate(30)}\"}`,
      isActual: false,
      isDeleted: false,
      isFavorited: false,
      isLong: false,
      isPublic: false,
      isPublished: true,
      latitude: Math.random() * 100,
      longitude: Math.random() * 100,
      maxPrice: {
        eur: Math.floor(Math.random() * 1500) + 1,
      },
      maxTotalReservationsPerCheckout: null,
      mediaFilename:
        "xl_4edc4b20b6d573d24cadd32673bb9143fbf14cd5ab63050ee916f12c.jpeg",
      minPrice: {
        eur: Math.floor(Math.random() * 1500),
      },
      minTotalReservationsPerCheckout: null,
      name: randomstring.generate(Math.floor(Math.random() * 20) + 10),
      place: randomstring.generate(Math.floor(Math.random() * 20) + 10),
      postalCode: `${Math.floor(Math.random() * 9000) + 1000}`,
      pricingInformation: null,
      productType: 1,
      salesEnded: Date.now() > this.endDate.getTime() ? true : false,
      salesOngoing:
        Date.now() > this.startDate.getTime() &&
        Date.now() < this.endDate.getTime()
          ? true
          : false,
      salesPaused: false,
      salesStarted: Date.now() > this.startDate.getTime() ? true : false,
      streetAddress: randomstring.generate(Math.floor(Math.random() * 20) + 10),
      time: Date.now(),
      timeUntilSalesStart:
        Date.now() > this.startDate.getTime()
          ? 0
          : this.startDate.getTime() - Date.now(),
    };

    return this.product;
  }
  /**
   * Returns the product and builds it if it doesn't exist and updates product
   * @returns Product
   */
  getProduct(): Product {
    if (!this.product) {
      this.build();
    }
    this.product.time = Date.now();
    this.product.timeUntilSalesStart =
      Date.now() > this.startDate.getTime()
        ? 0
        : this.startDate.getTime() - Date.now();

    return this.product;
  }
}
