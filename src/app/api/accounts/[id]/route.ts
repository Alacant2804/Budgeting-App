import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import apiErrorHandler from "@/utils/apiErrorHandler";
import { updateAccountSchema } from "@/features/accounts/schemas/account.schema";
import {
  createApiResponse,
  createErrorResponse,
  parseId,
} from "@/utils/api.utils";

export const PUT = apiErrorHandler(
  async (req: NextRequest, params?: { params?: Record<string, string> }) => {
    const id = parseId(params?.params?.id);
    if (!id) {
      return createErrorResponse("Invalid account ID");
    }

    const body = await req.json();
    const result = updateAccountSchema.safeParse(body);
    if (!result.success) {
      return createErrorResponse("Validation failed", result.error.errors);
    }

    const { name, balance, category } = result.data;

    const accountExists = await prisma.account.findUnique({ where: { id } });
    if (!accountExists) {
      return createErrorResponse("Account not found", undefined, 404);
    }

    const updatedAccount = await prisma.account.update({
      where: { id },
      data: {
        name: name || accountExists.name,
        balance,
        category: category || accountExists.category,
      },
    });

    return createApiResponse(updatedAccount);
  }
);

export const DELETE = apiErrorHandler(
  async (req: NextRequest, params?: { params?: Record<string, string> }) => {
    const id = parseId(params?.params?.id);
    if (!id) {
      return createErrorResponse("Invalid account ID");
    }

    const accountToDelete = await prisma.account.findUnique({ where: { id } });
    if (!accountToDelete) {
      return createErrorResponse("Account not found", undefined, 404);
    }

    await prisma.account.delete({ where: { id } });
    return createApiResponse({ message: "Account deleted successfully" }, 200);
  }
);
