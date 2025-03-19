"use client";

import { describe } from "node:test";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Account {
  id: number;
  name: string;
  icon?: string;
  balance: number;
}

interface Income {
  id: number;
  name: string;
  icon?: string;
  amount: number;
}

interface PlannedExpense {
  id: number;
  amount: number;
}

interface Expense {
  id: number;
  name: string;
  icon?: string;
  amount: number;
  plannedExpenses: PlannedExpense[];
}

interface Transaction {
  fromType: "income" | "account";
  fromId: number;
  toType: "account" | "expense";
  toId: number;
  amount: number;
  date: string; // Store date in ISO format or a string
  description?: string; // Optional field for transaction details
}

interface FinancialContextProps {
  netWorth: number;
  income: Income[];
  expenses: Expense[];
  accounts: Account[];
  transactions: Transaction[];
  addIncome: (newIncome: Income) => void;
  addAccount: (newAccount: Account) => void;
  addExpense: (newExpense: Expense) => void;
  transferMoney: (
    fromType: "income" | "account",
    fromId: number,
    toType: "account" | "expense",
    toId: number,
    amount: number
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

  // Functions to update financial data
  const addIncome = (newIncome: Income) =>
    setIncome((prev) => [...prev, newIncome]);
  const addAccount = (newAccount: Account) =>
    setAccounts((prev) => [...prev, newAccount]);
  const addExpense = (newExpense: Expense) =>
    setExpenses((prev) => [...prev, newExpense]);

  // Add Transaction to History
  const addTransaction = (
    fromType: "income" | "account",
    fromId: number,
    toType: "account" | "expense",
    toId: number,
    amount: number
  ) => {
    const newTransaction = {
      fromType,
      fromId,
      toType,
      toId,
      amount,
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
    amount: number
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

      addTransaction(fromType, fromId, toType, toId, amount); // Log transaction
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

      addTransaction(fromType, fromId, toType, toId, amount); // Log transaction
    }
  };

  return (
    <FinancialContext.Provider
      value={{
        netWorth,
        income,
        expenses,
        accounts,
        addIncome,
        addAccount,
        addExpense,
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
