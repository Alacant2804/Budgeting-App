export interface Transaction {
  fromType: "income" | "account";
  fromId: number;
  toType: "account" | "expense";
  toId: number;
  amount: number;
  date: string;
  category: string;
  description?: string;
}
