export interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    tags: string[];
}

export interface SearchableProduct extends Product {
    searchableName: string;
    searchableDescription: string;
    searchableTags: string[];
}