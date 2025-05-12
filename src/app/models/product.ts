import { ProductCategory } from "./productCategory";

export interface Product {
    category: ProductCategory;
    reference: string;
    name: string;
    price: number;
  }
  