import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../api/products";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import useDebounce from "../hooks/useDebounce";
import Pagination from "../components/Pagination";
import "../App.css";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 12;

  const debouncedMinPrice = useDebounce(minPrice, 400);
  const debouncedMaxPrice = useDebounce(maxPrice, 400);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, debouncedMinPrice, debouncedMaxPrice]);

  const { data, isFetching, error } = useQuery({
    queryKey: [
      "products",
      debouncedSearch,
      category,
      debouncedMinPrice,
      debouncedMaxPrice,
      page,
    ],
    queryFn: () =>
      getProducts(
        debouncedSearch,
        category,
        debouncedMinPrice,
        debouncedMaxPrice,
        page,
        pageSize,
      ),
      placeholderData: (previousData) => previousData,
  });


  if (error) {
    return <h2>Something went wrong.</h2>;
  }

  return (
    <div className="container">
      <h1>Product Search</h1>

      <div className="filters-card">
        <SearchBar value={search} onChange={setSearch} />
        <div className="filter-row">
          <Filters
            category={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onCategoryChange={setCategory}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
          />
        </div>
      </div>
      <Pagination
        page={page}
        totalPages={data?.pagination.totalPages ?? 1}
        onPageChange={setPage}
      />
      <p>
        Showing {data?.data.length ?? 0} of {data?.pagination.total ?? 0}{" "}
        products
      </p>
      {isFetching && (
        <div className="loading-bar">
          <div className="loading-fill"></div>
        </div>
      )}
      <ProductGrid products={data?.data ?? []} />
    </div>
  );
}
