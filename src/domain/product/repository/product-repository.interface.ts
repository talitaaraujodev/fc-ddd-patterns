import { RepositoryInterface } from "../../@shared/repository-interface";
import { Product } from "../entity/product";

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
