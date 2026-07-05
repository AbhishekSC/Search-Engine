import { Request, Response } from "express";
import { ProductRepository } from "../repository/product.repository";
import { SearchService } from "../services/search.service";

const repository = new ProductRepository();
const searchService = new SearchService(repository);

export class ProductController {
  public search(req: Request, res: Response) {
    const result = searchService.search({
      query: req.query.q as string,
      category: req.query.category as string,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 10,
    });

    return res.json(result);
  }
}
