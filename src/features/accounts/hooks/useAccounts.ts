import { useFinancialContext } from "@/context/FinancialContext";
import { Account } from "../types/types";
import { useState } from "react";

export function useAccounts() {
  const { accounts, setAccounts, netWorth } = useFinancialContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch accounts from API
  const fetchAccounts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/accounts");
      if (!response.ok) throw new Error("Failed to fetch accounts");
      const { data } = await response.json();
      setAccounts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Add account through API
  const addAccount = async (newAccount: Omit<Account, "id">) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccount),
      });
      if (!response.ok) throw new Error("Failed to add account");
      const { data: account } = await response.json();
      setAccounts((prev) => [...prev, account]);
      return account;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Remove account through API
  const removeAccount = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/accounts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to remove account");
      setAccounts((prev) => prev.filter((account) => account.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update account through API
  const updateAccount = async (id: number, updates: Partial<Account>) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/accounts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error("Failed to update account");
      const { data: updatedAccount } = await response.json();
      setAccounts((prev) =>
        prev.map((account) => (account.id === id ? updatedAccount : account))
      );
      return updatedAccount;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get account by ID (from local state)
  const getAccountById = (id: number) => {
    return accounts.find((account) => account.id === id);
  };

  return {
    accounts,
    netWorth,
    isLoading,
    error,
    fetchAccounts,
    addAccount,
    removeAccount,
    updateAccount,
    getAccountById,
  };
}
