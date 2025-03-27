export enum AccountCategory {
  CASH = "CASH",
  CREDIT = "CREDIT",
  REAL_ESTATE = "REAL_ESTATE",
  INVESTMENT = "INVESTMENT",
  CUSTOM = "CUSTOM",
}

export type Category = AccountCategory | string;

export interface Account {
  id: number;
  name: string;
  balance: number;
  icon?: string;
  category: Category;
}
