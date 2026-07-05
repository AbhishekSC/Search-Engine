import request from "supertest";
import app from "../app";

describe("Search API", () => {
  it("should return all products", async () => {
    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
  });

  it("should return products matching the product name", async () => {
  const response = await request(app).get("/products?q=laptop");

  expect(response.status).toBe(200);
});

it("should filter products by category", async () => {
  const response = await request(app).get("/products?category=Electronics");

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);

  response.body.data.forEach((product: any) => {
    expect(product.category).toBe("Electronics");
  });
});

it("should filter products by price range", async () => {
  const response = await request(app).get(
    "/products?minPrice=1000&maxPrice=2000"
  );

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);

  response.body.data.forEach((product: any) => {
    expect(product.price).toBeGreaterThanOrEqual(1000);
    expect(product.price).toBeLessThanOrEqual(2000);
  });
});

it("should paginate products", async () => {
  const response = await request(app).get("/products?page=1&limit=5");

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);

  expect(response.body.pagination.page).toBe(1);
  expect(response.body.pagination.limit).toBe(5);
  expect(response.body.data.length).toBeLessThanOrEqual(5);
});

it("should return an empty array when no products match", async () => {
  const response = await request(app).get(
    "/products?q=thisproductdoesnotexist"
  );

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.data).toEqual([]);
});
});
