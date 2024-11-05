import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Expense from '@/models/Expense';
import apiErrorHandler from "@/utils/apiErrorHandler";

async function expenseHandler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'GET':
            const expenses = await Expense.find({});
            return res.status(200).json({ success: true, data: expenses });
            
        case "POST":
            const expenseData = new Expense(req.body);
            await expenseData.save();
            return res.status(201).json({ success: true, data: expenseData });
        
        case "PUT":
            const { id, ...data } = req.body; 
            const updatedExpense = await Expense.findByIdAndUpdate(id, data, { new: true });
            if (!updatedExpense) {
                return res.status(404).json({ success: false, message: "Expense record not found" });
            }
            return res.status(200).json({ success: true, data: updatedExpense });

        case "DELETE":
            const { id: deleteId } = req.body;
            const deletedExpense = await Expense.findByIdAndDelete(deleteId);
            if (!deletedExpense) {
                return res.status(404).json({ success: false, message: "Expense record for deleting was not found" });
            }
            return res.status(200).json({ success: true, data: deletedExpense });

        default:
            return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
}

export default apiErrorHandler(expenseHandler);
