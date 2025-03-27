import { z } from "zod";
import { AccountCategory } from "../types/types";
import { toUpperCaseCategory } from "@/utils/string.utils";

export const updateAccountSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name is too long")
    .optional(),
  balance: z.number(),
  category: z
    .union([
      z.nativeEnum(AccountCategory),
      z.string().min(1, "Category is required"),
    ])
    .optional()
    .transform((val) => (val ? toUpperCaseCategory(val) : val)),
});

export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;
