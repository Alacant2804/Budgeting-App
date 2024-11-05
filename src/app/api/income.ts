import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Income from '@/models/Income';
import apiErrorHandler from "@/utils/apiErrorHandler";

async function incomeHandler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'GET':
            const incomes = await Income.find({});
            return res.status(200).json({ success: true, data: incomes });
            
        case "POST":
            const incomeData = new Income(req.body);
            await incomeData.save();
            return res.status(201).json({ success: true, data: incomeData });
        
        case "PUT":
            const { id, ...data } = req.body; 
            const updatedIncome = await Income.findByIdAndUpdate(id, data, { new: true });
            if (!updatedIncome) {
                return res.status(404).json({ success: false, message: "Income record not found" });
            }
            return res.status(200).json({ success: true, data: updatedIncome });

        case "DELETE":
            const { id: deleteId } = req.body;
            const deletedIncome = await Income.findByIdAndDelete(deleteId);
            if (!deletedIncome) {
                return res.status(404).json({ success: false, message: "Income record for deleting was not found" });
            }
            return res.status(200).json({ success: true, data: deletedIncome });

        default:
            return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
}

export default apiErrorHandler(incomeHandler);
