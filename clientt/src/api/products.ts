import axios from "axios";
// import type { Product } from "../types/product";

export const api = axios.create({
  baseURL: "http://localhost:3009",
});

export async function getProducts(
  query = "",
  category = "",
  minPrice = "",
  maxPrice = "",
  page = 1,
  pageSize = 10,
) {
  const response = await api.get("/products", {
    params: {
      q: query,
      category,
      minPrice,
      maxPrice,
      page,
      limit: pageSize,
    },
  });

  return response.data;
}
