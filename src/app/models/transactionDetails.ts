import { Stock } from "./stock";
import { Transactions } from "./trasanctions";

export interface TransactionDetails {
  id: number;
  transaction: Transactions;
  stock: Stock|null;
  quantity: number;
  total: number;
}
