export interface SearchRequest {
    query?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
}

export interface SearchResponse<T> {
    success: boolean;
    data: T[]
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }
}