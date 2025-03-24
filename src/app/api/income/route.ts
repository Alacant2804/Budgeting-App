import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import apiErrorHandler from "@/utils/apiErrorHandler";

export const GET = apiErrorHandler(async () => {
  const incomes = await prisma.income.findMany();
  return NextResponse.json({ success: true, data: incomes });
});

export const POST = apiErrorHandler(async (req: NextRequest) => {
  const { name } = await req.json();

  console.log(name);

  // Validate name value
  if (!name) {
    return NextResponse.json(
      { success: false, message: "Name is required" },
      { status: 400 }
    );
  }

  // Create new income item
  const newIncome = await prisma.income.create({
    data: {
      name,
      amount: 0,
    },
  });
  return NextResponse.json({ success: true, data: newIncome }, { status: 201 });
});

export const PUT = apiErrorHandler(async (req: NextRequest) => {
  const { id, name: newName, amount } = await req.json();

  // Validate body values
  if (!id || typeof id !== "number") {
    return NextResponse.json(
      { success: false, message: "Invalid or missing income item ID" },
      { status: 400 }
    );
  }

  if (typeof amount !== "number" || amount < 0) {
    return NextResponse.json(
      { success: false, message: "Amount should be a positive number" },
      { status: 400 }
    );
  }

  // Check if the income exists
  const incomeExists = await prisma.income.findUnique({ where: { id } });
  if (!incomeExists) {
    return NextResponse.json(
      { success: false, message: "Income item not found" },
      { status: 404 }
    );
  }

  // Update income item
  const updatedIncome = await prisma.income.update({
    where: { id },
    data: { name: newName || incomeExists.name, amount },
  });
  return NextResponse.json({ success: true, data: updatedIncome });
});

export const DELETE = apiErrorHandler(async (req: NextRequest) => {
  const { id: deleteId } = await req.json();

  // Validate id
  if (!deleteId || typeof deleteId !== "number") {
    return NextResponse.json(
      { success: false, message: "Invalid or missing income item ID" },
      { status: 400 }
    );
  }

  // Check if the income exists before deleting
  const incomeToDelete = await prisma.income.findUnique({
    where: { id: deleteId },
  });

  if (!incomeToDelete) {
    return NextResponse.json(
      { success: false, message: "Income item not found" },
      { status: 404 }
    );
  }

  // Delete income item
  await prisma.income.delete({ where: { id: deleteId } });
  return NextResponse.json({ status: 204 });
});
