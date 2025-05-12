import { Store } from './store';
import { ProductVariation } from './productVariation';

export interface StockId {
  storeStk: Store;
  variationStk: ProductVariation;
}

export interface Stock {
  id: StockId; 
  quantity: number;
}

