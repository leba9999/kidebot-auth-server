/**
 * Category of the event
 */
interface Category {
  dateCreated: Date; // When the category was created
  dateModified: Date; // When the category was modified
  id: string; // Id of the category
  isFilterable: boolean; // Is the category filterable
  isPublic: boolean; // Is the category public
  name: string; // Name of the category (remember this is an object inside string)
  nameResourceKey: string; // TODO find out what this is
  orderingNumber: number; // TODO find out what this is
  parentCategoryId: null | string; // Parent category id
  productTypes: number[]; // Product types of the category
  type: number; // For what product type. E.g. 1 = event, 2 = products, 3 = membership
}

export default Category;
