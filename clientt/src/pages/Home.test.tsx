import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./Home";
import { getProducts } from "../api/products";

vi.mock("../api/products", () => ({
  getProducts: vi.fn().mockResolvedValue({
    data: [
      {
        id: 1,
        name: "Laptop",
        description: "Gaming laptop",
        category: "Electronics",
        price: 50000,
        score: 10,
        tags: ["gaming", "laptop"],
      },
    ],
    pagination: {
      page: 1,
      limit: 5,
      total: 1,
      totalPages: 1,
    },
  }),
}));

const mockedGetProducts = vi.mocked(getProducts);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe("Home", () => {
  it("renders products from the API", async () => {
    render(<Home />, {
      wrapper: createWrapper(),
    });

    expect(await screen.findByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("Gaming laptop")).toBeInTheDocument();
    expect(mockedGetProducts).toHaveBeenCalled();
  });

  it("updates the search input", () => {
    render(<Home />, {
      wrapper: createWrapper(),
    });

    const input = screen.getByPlaceholderText("Search products...");

    fireEvent.change(input, {
      target: { value: "Laptop" },
    });

    expect(input).toHaveValue("Laptop");
  });

  it("renders category and price filters", () => {
    render(<Home />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText("All Categories")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Min Price")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Max Price")).toBeInTheDocument();
  });
});