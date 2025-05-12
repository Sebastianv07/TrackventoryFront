import { TransactionTypes } from "./transactionTypes";

export interface Transactions {
    id: number;
    buyer: null;
    seller: null;
    date: Date;
    transactionType: TransactionTypes;
  }
  