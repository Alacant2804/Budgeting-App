import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";
import apiErrorHandler from "@/utils/apiErrorHandler";

export const GET = apiErrorHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const expenses = await prisma.expense.findMany();
    res.status(200).json({ success: true, data: expenses });
  }
);

export const POST = apiErrorHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { name } = req.body;

    // Validate name value
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    // Create new expense item
    const newExpense = await prisma.expense.create({
      data: {
        name,
        amount: 0,
        date: new Date(),
      },
    });
    res.status(201).json({ success: true, data: newExpense });
  }
);

export const PUT = apiErrorHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, name: newName, amount } = req.body;

    // Validate body values
    if (!id || typeof id !== "number") {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing expense item ID",
      });
    }

    if (typeof amount !== "number" || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: "Amount should be a number",
      });
    }

    // Check if the expense exists
    const expenseExists = await prisma.expense.findUnique({ where: { id } });
    if (!expenseExists) {
      return res.status(404).json({
        success: false,
        message: "Expense item not found",
      });
    }

    // Update expense item
    const updatedExpense = await prisma.expense.update({
      where: { id },
      data: { name: newName || expenseExists.name, amount, date: new Date() },
    });
    res.status(200).json({ success: true, data: updatedExpense });
  }
);

export const DELETE = apiErrorHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id: deleteId } = req.body;

    // Validate id
    if (!deleteId || typeof deleteId !== "number") {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing expense item ID",
      });
    }

    // Check if the expense exists before deleting
    const expenseToDelete = await prisma.expense.findUnique({
      where: { id: deleteId },
    });
    if (!expenseToDelete) {
      return res.status(404).json({
        success: false,
        message: "Expense item not found",
      });
    }

    // Delete expense item
    await prisma.expense.delete({ where: { id: deleteId } });
    res.status(204).end();
  }
);
