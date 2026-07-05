type Props = {
  category: string;
  minPrice: string;
  maxPrice: string;
  onCategoryChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
};

const categories = [
  "",
  "Electronics",
  "Books",
  "Fashion",
  "Sports",
  "Home",
];

export default function Filters({
  category,
  minPrice,
  maxPrice,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
}: Props) {
  return (
    <div className="filters-container">
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        style={{marginBottom: "0px"}}
      >
        {categories.map((item) => (
          <option key={item} value={item}>
            {item || "All Categories"}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => onMinPriceChange(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => onMaxPriceChange(e.target.value)}
      />
    </div>
  );
}