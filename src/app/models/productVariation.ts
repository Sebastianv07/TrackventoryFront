import { Color } from "./color";
import { Product } from "./product";

export interface ProductVariation {
    code: string;
    colorVrt: Color;
    productVrt: Product;
  }