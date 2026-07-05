import {SearchableProduct} from "./product.model";

export interface RankedProduct {
    product: SearchableProduct;
    score: number;
}