import randomstring from "randomstring";
import Category from "../../interfaces/Category";

export default class CategoryBuilder {
  date: Date;
  category!: Category;
  constructor(date: Date) {
    this.date = date;
  }
  build(): Category {
    this.category = {
      dateCreated: this.date,
      dateModified: this.date,
      id: randomstring.generate(36),
      isFilterable: true,
      isPublic: true,
      name: randomstring.generate(6),
      nameResourceKey: "",
      orderingNumber: 1,
      parentCategoryId: null,
      productTypes: [1],
      type: 1,
    };
    return this.category;
  }
  getCategory(): Category {
    if (!this.category) {
      this.build();
    }
    return this.category;
  }
}
