"use client";

import { useState } from "react";
import { useAccounts } from "@/features/accounts/hooks/useAccounts";
import { AccountCategory, Category } from "@/features/accounts/types/types";
import {
  formatCategoryName,
  toUpperCaseCategory,
  isCustomCategory,
} from "@/utils/string.utils";

export default function AddAccountButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    balance: number;
    category: Category;
  }>({
    name: "",
    balance: 0,
    category: AccountCategory.CASH,
  });
  const [customCategory, setCustomCategory] = useState("");
  const [error, setError] = useState("");
  const { addAccount } = useAccounts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const accountData = {
        ...formData,
        category:
          formData.category === AccountCategory.CUSTOM
            ? toUpperCaseCategory(customCategory)
            : formData.category,
      };
      await addAccount(accountData);
      setIsOpen(false);
      setFormData({ name: "", balance: 0, category: AccountCategory.CASH });
      setCustomCategory("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add account");
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Account
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Account</h2>

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

              {error && <div className="text-red-500 mb-4">{error}</div>}

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
                  Add Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
