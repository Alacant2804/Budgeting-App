export type AccountType =
  | "checking"
  | "savings"
  | "credit"
  | "investment"
  | "loan";

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
}

export interface AddAccountFormData {
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
}

export interface AccountSummaryProps {
  totalAssets: number;
  totalLiabilities: number;
}

export interface AccountListProps {
  accounts: Account[];
}

export interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddAccountFormData) => void;
}

export interface NetWorthChartData {
  assets: number;
  liabilities: number;
  netWorth: number;
}
