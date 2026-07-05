import products from "../data/products.json";
import {
  Product,
  SearchableProduct,
} from "../models/product.model";

export class ProductRepository {
  private readonly products: SearchableProduct[];

  constructor() {
    this.products = products.map((product: Product) => ({
      ...product,
      searchableName: product.name.toLowerCase(),
      searchableDescription: product.description.toLowerCase(),
      searchableTags: product.tags.map((tag) =>
        tag.toLowerCase()
      ),
    }));
  }

  public getAllProducts(): SearchableProduct[] {
    return this.products ?? [];
  }
}