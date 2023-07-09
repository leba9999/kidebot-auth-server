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
    let companyBuilder = new CompanyBuilder(new Date());
    let productBuilder = new ProductBuilder(this.date);
    let RandomVariants = [];
    productBuilder.setCompany(companyBuilder.getCompany());
    for (let i = 0; i < Math.floor(Math.random() * 20) + 1; i++) {
      let variantBuilder = new VariantBuilder(this.date);
      variantBuilder.setProduct(productBuilder.getProduct());
      RandomVariants.push(variantBuilder.getVariant());
    }
    this.event = {
      links: null,
      model: {
        categories: [new CategoryBuilder(this.date).getCategory()],
        company: companyBuilder.getCompany(),
        isHakaRequired: false,
        product: productBuilder.getProduct(),
        variants: RandomVariants,
      },
    };
  }
  getEvent() {
    return this.event;
  }
}