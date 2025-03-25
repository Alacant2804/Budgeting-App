export enum AccountCategory {
  CHECKING = "Checking",
  SAVINGS = "Savings",
  CREDIT = "Credit",
  REAL_ESTATE = "Real Estate",
  VEHICLE = "Vehicle",
  LOAN = "Loan",
  INVESTMENT = "Investment",
  CUSTOM = "Custom",
}

export interface Account {
  id: number;
  name: string;
  balance: number;
  icon?: string;
  category: AccountCategory;
}
