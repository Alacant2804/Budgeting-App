import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Income from '@/models/Income';

export default async function incomeHandler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { method } = req.method;

    switch (method) {
        case 'GET': 
            try {
                const incomes = await Income.find({}); // return every document in the Income collection
                res.status(200).json({ success: true, data: incomes});
            } catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ success: false, message: error.message });
                } else {
                    res.status(400).json({ success: false, message: "An unknown error occurred" });
                }              }
            break; // Done with the request cycle. Prevents from running any other cases unintentionally
        
        case "POST":
            try {
                const incomeData = new Income(req.body);
                await incomeData.save();
                res.status(201).json({ success: true, data: incomeData });
            } catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ success: false, message: error.message });
                } else {
                    res.status(400).json({ success: false, message: "An unknown error occurred" });
                }     
            }
            break;
        
        case "PUT":
            try {
                const { id, ...data } = req.body; 
                const updatedIncome = await Income.findByIdAndUpdate(id, data, { new: true }); // new option returns updated data (without it we would return data before update)
                if (!updatedIncome) {
                    return res.status(404).json({ success: false, message: "Income record not found" });
                }
                res.status(200).json({ success: true, data: updatedIncome });
            } catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ success: false, message: error.message });
                } else {
                    res.status(400).json({ success: false, message: "An unknown error occurred" });
                }            }
            break;

        case "DELETE":
            try {
                const { id } = req.body;
                const deletedIncome = await Income.findByIdAndDelete(id);
                if (!deletedIncome) {
                    return res.status(404).json({ success: false, message: "Income record for deleting was not found"});
                }
                res.status(200).json({ success: true, data: deletedIncome });
            } catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ success: false, message: error.message });
                } else {
                    res.status(400).json({ success: false, message: "An unknown error occurred" });
                }
            }
            break;
        }
}