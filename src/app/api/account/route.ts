import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import apiErrorHandler from "@/utils/apiErrorHandler";

export const GET = apiErrorHandler(async () => {
  const accounts = await prisma.account.findMany();
  return NextResponse.json({ success: true, data: accounts });
});

export const POST = apiErrorHandler(async (req: NextRequest) => {
  const { name } = await req.json();

  // Validate name value
  if (!name) {
    return NextResponse.json(
      { success: false, message: "Name is required" },
      { status: 400 }
    );
  }

  // Create new account item
  const newAccount = await prisma.account.create({
    data: {
      name,
      balance: 0,
    },
  });
  return NextResponse.json(
    { success: true, data: newAccount },
    { status: 201 }
  );
});

export const PUT = apiErrorHandler(async (req: NextRequest) => {
  const { id, name: newName, balance } = await req.json();

  // Validate body values
  if (!id || typeof id !== "number") {
    return NextResponse.json(
      { success: false, message: "Invalid or missing account item ID" },
      { status: 400 }
    );
  }

  if (typeof balance !== "number" || isNaN(balance)) {
    return NextResponse.json(
      { success: false, message: "Balance should be a valid number" },
      { status: 400 }
    );
  }

  // Check if the account exists
  const accountExists = await prisma.account.findUnique({ where: { id } });
  if (!accountExists) {
    return NextResponse.json(
      { success: false, message: "Account item not found" },
      { status: 404 }
    );
  }

  // Update account item
  const updatedAccount = await prisma.account.update({
    where: { id },
    data: { name: newName || accountExists.name, balance },
  });
  return NextResponse.json({ success: true, data: updatedAccount });
});

export const DELETE = apiErrorHandler(async (req: NextRequest) => {
  const { id: deleteId } = await req.json();

  // Validate id
  if (!deleteId || typeof deleteId !== "number") {
    return NextResponse.json(
      { success: false, message: "Invalid or missing account item ID" },
      { status: 400 }
    );
  }

  // Check if the account exists before deleting
  const accountToDelete = await prisma.account.findUnique({
    where: { id: deleteId },
  });
  if (!accountToDelete) {
    return NextResponse.json(
      { success: false, message: "Account item not found" },
      { status: 404 }
    );
  }

  // Delete account item
  await prisma.account.delete({ where: { id: deleteId } });
  return NextResponse.json({ status: 204 });
});
