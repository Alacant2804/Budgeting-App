import { AccountCategory } from "@/features/accounts/types/types";

export function formatCategoryName(category: string): string {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function toUpperCaseCategory(category: string): string {
  return category.toUpperCase().replace(/\s+/g, "_");
}

export function isCustomCategory(category: string): boolean {
  return !Object.values(AccountCategory).includes(category as AccountCategory);
}
