export interface PlannedExpense {
  id: number;
  amount: number;
}

export interface Expense {
  id: number;
  name: string;
  category: string;
  icon?: string;
  amount: number;
  plannedExpenses: PlannedExpense[];
}
