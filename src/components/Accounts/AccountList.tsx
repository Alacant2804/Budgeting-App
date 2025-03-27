"use client";

import { useAccounts } from "@/features/accounts/hooks/useAccounts";
import { useEffect, useState } from "react";
import { AccountCategory, Category } from "@/features/accounts/types/types";
import {
  formatCategoryName,
  toUpperCaseCategory,
  isCustomCategory,
} from "@/utils/string.utils";

export default function AccountList() {
  const {
    accounts,
    isLoading,
    error,
    fetchAccounts,
    updateAccount,
    removeAccount,
  } = useAccounts();
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({
    [AccountCategory.CASH]: true,
    [AccountCategory.CREDIT]: true,
    [AccountCategory.INVESTMENT]: true,
    [AccountCategory.REAL_ESTATE]: true,
    [AccountCategory.CUSTOM]: true,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<{
    id: number;
    name: string;
    balance: number;
    category: Category;
  }>({
    id: 0,
    name: "",
    balance: 0,
    category: AccountCategory.CASH,
  });
  const [customCategory, setCustomCategory] = useState("");

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    if (editingId) {
      const accountToEdit = accounts.find(
        (account) => account.id === editingId
      );
      if (accountToEdit) {
        setFormData({
          id: accountToEdit.id,
          name: accountToEdit.name,
          balance: accountToEdit.balance,
          category: accountToEdit.category,
        });
      }
    }
  }, [editingId, accounts]);

  function toggleCategory(category: string) {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) {
    console.error(error);
    return (
      <div className="text-red-500 text-center py-4">
        Error loading accounts
      </div>
    );
  }

  // Group accounts by category
  const groupedAccounts = accounts.reduce(
    (acc, account) => {
      if (!acc[account.category]) {
        acc[account.category] = [];
      }
      acc[account.category].push(account);
      return acc;
    },
    {} as Record<string, typeof accounts>
  );

  // Calculate total balance for each category
  const totalBalances = Object.entries(groupedAccounts).map(
    ([category, amount]) => {
      const totalBalance = amount.reduce(
        (sum, account) => sum + account.balance,
        0
      );
      return {
        category,
        totalBalance,
      };
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const updatedData = {
        ...formData,
        category:
          formData.category === AccountCategory.CUSTOM
            ? toUpperCaseCategory(customCategory)
            : formData.category,
      };
      await updateAccount(editingId, updatedData);
    }
    setIsOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ul className="space-y-4">
        {Object.entries(groupedAccounts).map(([category, accounts]) => (
          <li key={category} className="bg-white rounded-lg shadow">
            <div
              onClick={() => toggleCategory(category)}
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block transition-all duration-200 transform ${
                    expandedCategories[category] ? "rotate-90" : "rotate-0"
                  }`}
                >
                  ▶
                </span>
                <h2 className="text-lg font-semibold text-gray-800">
                  {formatCategoryName(category)}
                </h2>
              </div>
              <span className="text-gray-600">
                $
                {totalBalances
                  .find((balance) => balance.category === category)
                  ?.totalBalance.toLocaleString()}
              </span>
            </div>
            {expandedCategories[category] && (
              <ul className="border-t border-gray-100">
                {accounts.map((account) => (
                  <li
                    key={account.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    onDoubleClick={() => {
                      setEditingId(account.id);
                      setIsOpen(!isOpen);
                    }}
                  >
                    <span className="font-medium text-gray-700">
                      {account.name}
                    </span>
                    <span className="text-gray-600">
                      ${account.balance.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">
                  Account Name:
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border rounded px-2 py-1"
                    required
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block mb-2">
                  Balance:
                  <input
                    type="number"
                    value={formData.balance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        balance: Number(e.target.value),
                      })
                    }
                    className="w-full border rounded px-2 py-1"
                    required
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block mb-2">
                  Category:
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as Category,
                      })
                    }
                    className="w-full border rounded px-2 py-1"
                  >
                    {Object.entries(AccountCategory).map(([key, value]) => (
                      <option key={key} value={value}>
                        {formatCategoryName(value)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {formData.category === AccountCategory.CUSTOM && (
                <div className="mb-4">
                  <label className="block mb-2">
                    Create New Category:
                    <input
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full border rounded px-2 py-1"
                      placeholder="Enter new category name"
                      required
                    />
                  </label>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update Account
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (editingId) {
                      removeAccount(editingId);
                    }
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Delete Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
