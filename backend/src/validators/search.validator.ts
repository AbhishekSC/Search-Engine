import { SearchRequest } from "../models/search.model";

export function validateSearchRequest(request: SearchRequest): void {
  if (request.page !== undefined && request.page < 1) {
    throw new Error("Page must be greater than 0");
  }

  if (request.limit !== undefined && request.limit < 1) {
    throw new Error("Limit must be greater than 0");
  }

  if (request.limit !== undefined && request.limit > 50) {
    throw new Error("Limit cannot exceed 50");
  }

  if (request.minPrice !== undefined && request.minPrice < 0) {
    throw new Error("Minimum price cannot be negative");
  }

  if (request.maxPrice !== undefined && request.maxPrice < 0) {
    throw new Error("Maximum price cannot be negative");
  }

  // if (
  //   request.minPrice !== undefined &&
  //   request.maxPrice !== undefined &&
  //   request.minPrice > request.maxPrice
  // ) {
  //   throw new Error("Minimum price cannot be greater than maximum price");
  // }

  if (request.query && request.query.length > 100) {
    throw new Error("Query cannot exceed 100 characters");
  }
}
