import type { Product } from "../types/product";
import "./ProductCard.css";

interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
       <div className="product-card-header">
          <span className="score-badge">{product.category}</span>
      </div>
      <h4 className="price">₹{product.price}</h4>
    </div>
  );
}
