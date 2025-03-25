import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import apiErrorHandler from "@/utils/apiErrorHandler";
import { z } from "zod";
import { AccountCategory } from "@prisma/client";

const updateAccountSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name is too long")
    .optional(),
  balance: z.number(),
  category: z.nativeEnum(AccountCategory).optional(),
});

export const PUT = apiErrorHandler(
  async (req: NextRequest, params?: { params?: { id: number } }) => {
    if (!params?.params?.id) {
      return NextResponse.json(
        { success: false, message: "Account ID is required" },
        { status: 400 }
      );
    }
    const id = params.params.id;
    const body = await req.json();

    const result = updateAccountSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: result.error.errors,
        },
        { status: 400 }
      );
    }

    const { name, balance, category } = result.data;

    const accountExists = await prisma.account.findUnique({ where: { id } });
    if (!accountExists) {
      return NextResponse.json(
        { success: false, message: "Account not found" },
        { status: 404 }
      );
    }

    const updatedAccount = await prisma.account.update({
      where: { id },
      data: {
        name: name || accountExists.name,
        balance,
        category: category || accountExists.category,
      },
    });

    return NextResponse.json({ success: true, data: updatedAccount });
  }
);

export const DELETE = apiErrorHandler(
  async (req: NextRequest, params?: { params?: { id: number } }) => {
    if (!params?.params?.id) {
      return NextResponse.json(
        { success: false, message: "Account ID is required" },
        { status: 400 }
      );
    }
    const id = params.params.id;

    const accountToDelete = await prisma.account.findUnique({ where: { id } });
    if (!accountToDelete) {
      return NextResponse.json(
        { success: false, message: "Account not found" },
        { status: 404 }
      );
    }

    await prisma.account.delete({ where: { id } });
    return NextResponse.json(
      { success: true, message: "Account deleted successfully" },
      { status: 200 }
    );
  }
);
