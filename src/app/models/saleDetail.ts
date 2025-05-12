import { Stock } from './stock';

export interface SaleDetail {
  id: number;
  stockSld: Stock | null;
  quantity: number;
  totalValue: number;
}
