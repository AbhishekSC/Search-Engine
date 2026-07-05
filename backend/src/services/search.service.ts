import { ProductRepository } from "../repository/product.repository";
import { Product, SearchableProduct } from "../models/product.model";

import { SearchRequest, SearchResponse } from "../models/search.model";

import { SEARCH_WEIGHTS } from "../constants/search.constant";
import { RankedProduct } from "../models/ranked-product.model";
import { validateSearchRequest } from "../validators/search.validator";

export class SearchService {
  constructor(private readonly repository: ProductRepository) {}

  private calculateScore(product: SearchableProduct, query: string): number {
    let score = 0;

    if (product.searchableName === query) {
      score += SEARCH_WEIGHTS.EXACT_NAME;
    } else if (product.searchableName.includes(query)) {
      score += SEARCH_WEIGHTS.NAME;
    }

    if (product.searchableDescription.includes(query)) {
      score += SEARCH_WEIGHTS.DESCRIPTION;
    }

    if (product.searchableTags.some((tag) => tag.includes(query))) {
      score += SEARCH_WEIGHTS.TAG;
    }

    return score;
  }

  private sortProducts(products: RankedProduct[]): RankedProduct[] {
    return products.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.product.name.localeCompare(b.product.name);
    });
  }

  private applyFilters(
    products: RankedProduct[],
    request: SearchRequest,
  ): RankedProduct[] {
    let filteredProducts = products;

    if (request.category) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.product.category.toLowerCase() ===
          request.category!.toLowerCase(),
      );
    }

    if (request.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.product.price >= request.minPrice!,
      );
    }

    if (request.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.product.price <= request.maxPrice!,
      );
    }

    return filteredProducts;
  }

  private paginated(products: RankedProduct[], page: number, limit: number) {
    const start = (page - 1) * limit;

    const end = start + limit;

    const items = products.slice(start, end);

    return {
      items,
      total: products.length,
      page,
      limit,
      totalPages: Math.ceil(products.length / limit),
    };
  }

  public search(request: SearchRequest): SearchResponse<Product> {
    validateSearchRequest(request);

    const query = request.query?.trim().toLowerCase();
    const products = this.repository.getAllProducts();

    // Rank products
    const rankedProducts: RankedProduct[] = [];

    for (const product of products) {
      const score = query ? this.calculateScore(product, query) : 1;

      if (score > 0) {
        rankedProducts.push({
          product,
          score,
        });
      }
    }

    // Sort
    const sortedProducts = this.sortProducts(rankedProducts);

    // Filter
    const filteredProducts = this.applyFilters(sortedProducts, request);

    // Pagination
    const paginatedResults = this.paginated(
      filteredProducts,
      request.page ?? 1,
      request.limit ?? 10,
    );

    return {
      success: true,
      data: paginatedResults.items.map((item) => ({
        ...item.product,
        score: item.score
      })),
      pagination: {
        page: paginatedResults.page,
        limit: paginatedResults.limit,
        total: paginatedResults.total,
        totalPages: paginatedResults.totalPages,
      },
    };
  }
}
