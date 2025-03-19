import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";
import apiErrorHandler from "@/utils/apiErrorHandler";

export const GET = apiErrorHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const accounts = await prisma.account.findMany();
    res.status(200).json({ success: true, data: accounts });
  }
);

export const POST = apiErrorHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { name } = req.body;

    // Validate name value
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    // Create new account item
    const newAccount = await prisma.account.create({
      data: {
        name,
        balance: 0,
      },
    });
    res.status(201).json({ success: true, data: newAccount });
  }
);

export const PUT = apiErrorHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, name: newName, balance } = req.body;

    // Validate body values
    if (!id || typeof id !== "number") {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing account item ID",
      });
    }

    if (typeof balance !== "number" || isNaN(balance)) {
      return res.status(400).json({
        success: false,
        message: "Balance should be a number",
      });
    }

    // Check if the account exists
    const accountExists = await prisma.account.findUnique({ where: { id } });
    if (!accountExists) {
      return res.status(404).json({
        success: false,
        message: "Account item not found",
      });
    }

    // Update account item
    const updatedAccount = await prisma.account.update({
      where: { id },
      data: { name: newName || accountExists.name, balance },
    });
    res.status(200).json({ success: true, data: updatedAccount });
  }
);

export const DELETE = apiErrorHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id: deleteId } = req.body;

    // Validate id
    if (!deleteId || typeof deleteId !== "number") {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing account item ID",
      });
    }

    // Check if the account exists before deleting
    const accountToDelete = await prisma.account.findUnique({
      where: { id: deleteId },
    });
    if (!accountToDelete) {
      return res.status(404).json({
        success: false,
        message: "Account item not found",
      });
    }

    // Delete account item
    await prisma.account.delete({ where: { id: deleteId } });
    res.status(204).end();
  }
);
