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
  transferMoney: (
    fromType: "income" | "account",
    fromId: number,
    toType: "account" | "expense",
    toId: number,
    amount: number,
    category: string
  ) => void;
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

  // Add Transaction to History
  const addTransaction = (
    fromType: "income" | "account",
    fromId: number,
    toType: "account" | "expense",
    toId: number,
    amount: number,
    category: string
  ) => {
    const newTransaction = {
      fromType,
      fromId,
      toType,
      toId,
      amount,
      category,
      date: new Date().toISOString(), // Add current date
      description: `${fromType} ID: ${fromId} to ${toType} ID: ${toId} - Amount: ${amount}`,
    };

    setTransactions((prev) => [...prev, newTransaction]);
  };

  // General function to move money between income, accounts, and expenses
  const transferMoney = (
    fromType: "income" | "account",
    fromId: number,
    toType: "account" | "expense",
    toId: number,
    amount: number,
    category: string
  ) => {
    if (fromType === "income" && toType === "expense") return;

    if (fromType === "income") {
      // Moving money from Income to an Account
      const incomeItem = income.find((item) => item.id === fromId);
      if (!incomeItem) return;

      setIncome((prev) =>
        prev.map((item) =>
          item.id === fromId ? { ...item, amount: item.amount + amount } : item
        )
      );

      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === toId ? { ...acc, balance: acc.balance + amount } : acc
        )
      );

      addTransaction(fromType, fromId, toType, toId, amount, category); // Log transaction
    } else if (fromType === "account") {
      // Moving money from an Account to an Expense
      const account = accounts.find((acc) => acc.id === fromId);
      if (!account) return;

      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === fromId ? { ...acc, balance: acc.balance - amount } : acc
        )
      );

      setExpenses((prev) =>
        prev.map((exp) =>
          exp.id === toId ? { ...exp, amount: exp.amount + amount } : exp
        )
      );

      addTransaction(fromType, fromId, toType, toId, amount, category); // Log transaction
    }
  };

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
        transferMoney,
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
