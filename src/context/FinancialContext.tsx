"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Account } from "@/features/accounts/types/types";
import { Income } from "@/features/income/types/types";
import { Expense } from "@/features/expenses/types/types";
import { Transaction } from "@/features/transactions/types/types";

interface FinancialContextProps {
  netWorth: number;
  setNetWorth: React.Dispatch<React.SetStateAction<number>>;
  income: Income[];
  setIncome: React.Dispatch<React.SetStateAction<Income[]>>;
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const FinancialContext = createContext<FinancialContextProps | undefined>(
  undefined
);

export const FinancialProvider = ({ children }: { children: ReactNode }) => {
  const [income, setIncome] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [netWorth, setNetWorth] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Update net worth whenever account changes
  useEffect(() => {
    const totalBalance = accounts.reduce(
      (total, account) => total + account.balance,
      0
    );
    setNetWorth(totalBalance);
  }, [accounts]);

  return (
    <FinancialContext.Provider
      value={{
        netWorth,
        setNetWorth,
        income,
        setIncome,
        expenses,
        setExpenses,
        accounts,
        setAccounts,
        transactions,
        setTransactions,
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
};

// Custom Hook for using FinancialContext
export function useFinancialContext() {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error(
      "useFinancialContext must be used within a FinancialProvider"
    );
  }
  return context;
}

export default FinancialContext;
