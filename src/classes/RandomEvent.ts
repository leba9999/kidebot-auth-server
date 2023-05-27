import { Event } from "../interfaces/Event";
import CategoryBuilder from "./builders/CategoryBuilder";
import CompanyBuilder from "./builders/CompanyBuilder";
import ProductBuilder from "./builders/ProductBuilder";
import VariantBuilder from "./builders/VariantBuilder";

export default class RandomEvent {
  date: Date;
  event: Event;

  constructor(date: Date) {
    this.date = date;
    let companyBuilder = new CompanyBuilder(this.date);
    let productBuilder = new ProductBuilder(this.date);
    let variantBuilder = new VariantBuilder(this.date);
    productBuilder.setCompany(companyBuilder.getCompany());
    variantBuilder.setProduct(productBuilder.getProduct());
    this.event = {
      links: null,
      model: {
        categories: [new CategoryBuilder(this.date).getCategory()],
        company: companyBuilder.getCompany(),
        isHakaRequired: false,
        product: productBuilder.getProduct(),
        variants: [variantBuilder.getVariant()],
      },
    };
  }
  getEvent() {
    return this.event;
  }
}
