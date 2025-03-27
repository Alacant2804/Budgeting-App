import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import apiErrorHandler from "@/utils/apiErrorHandler";
import { z } from "zod";
import { AccountCategory } from "@/features/accounts/types/types";

// Define validation schemas
const createAccountSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  balance: z.number().optional().default(0),
  category: z
    .union([
      z.nativeEnum(AccountCategory),
      z.string().min(1, "Category is required"),
    ])
    .optional()
    .default(AccountCategory.CUSTOM),
});

export const GET = apiErrorHandler(async () => {
  const accounts = await prisma.account.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ success: true, data: accounts });
});

export const POST = apiErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  console.log("Received body:", body);

  // Validate request body
  const result = createAccountSchema.safeParse(body);
  if (!result.success) {
    console.log("Validation errors:", result.error.errors);
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
  console.log("Validated data:", { name, balance, category });

  // Create new account
  const newAccount = await prisma.account.create({
    data: {
      name,
      balance,
      category,
    },
  });

  return NextResponse.json(
    { success: true, data: newAccount },
    { status: 201 }
  );
});
