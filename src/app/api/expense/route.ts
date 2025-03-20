import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import apiErrorHandler from "@/utils/apiErrorHandler";

export const GET = apiErrorHandler(async () => {
  const expenses = await prisma.expense.findMany();
  return NextResponse.json({ success: true, data: expenses });
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

  // Create new expense item
  const newExpense = await prisma.expense.create({
    data: {
      name,
      amount: 0,
      date: new Date(),
    },
  });
  return NextResponse.json(
    { success: true, data: newExpense },
    { status: 201 }
  );
});

export const PUT = apiErrorHandler(async (req: NextRequest) => {
  const { id, name: newName, amount } = await req.json();

  // Validate body values
  if (!id || typeof id !== "number") {
    return NextResponse.json(
      { success: false, message: "Invalid or missing expense item ID" },
      { status: 400 }
    );
  }

  if (typeof amount !== "number" || isNaN(amount)) {
    return NextResponse.json(
      { success: false, message: "Amount should be a valid number" },
      { status: 400 }
    );
  }

  // Check if the expense exists
  const expenseExists = await prisma.expense.findUnique({ where: { id } });
  if (!expenseExists) {
    return NextResponse.json(
      { success: false, message: "Expense item not found" },
      { status: 404 }
    );
  }

  // Update expense item
  const updatedExpense = await prisma.expense.update({
    where: { id },
    data: {
      name: newName?.trim() || expenseExists.name,
      amount,
      date: new Date(),
    },
  });
  return NextResponse.json({ success: true, data: updatedExpense });
});

export const DELETE = apiErrorHandler(async (req: NextRequest) => {
  const { id: deleteId } = await req.json();

  // Validate id
  if (!deleteId || typeof deleteId !== "number") {
    return NextResponse.json(
      { success: false, message: "Invalid or missing expense item ID" },
      { status: 400 }
    );
  }

  // Check if the expense exists before deleting
  const expenseToDelete = await prisma.expense.findUnique({
    where: { id: deleteId },
  });
  if (!expenseToDelete) {
    return NextResponse.json(
      { success: false, message: "Expense item not found" },
      { status: 404 }
    );
  }

  // Delete expense item
  await prisma.expense.delete({ where: { id: deleteId } });
  return NextResponse.json({ status: 204 });
});
