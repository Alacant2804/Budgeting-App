import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Account from '@/models/Account';
import apiErrorHandler from "@/utils/apiErrorHandler";

async function accountHandler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'GET':
            const accounts = await Account.find({});
            return res.status(200).json({ success: true, data: accounts });
            
        case "POST":
            const accountData = new Account(req.body);
            await accountData.save();
            return res.status(201).json({ success: true, data: accountData });
        
        case "PUT":
            const { id, ...data } = req.body; 
            const updatedAccount = await Account.findByIdAndUpdate(id, data, { new: true });
            if (!updatedAccount) {
                return res.status(404).json({ success: false, message: "Account record not found" });
            }
            return res.status(200).json({ success: true, data: updatedAccount });

        case "DELETE":
            const { id: deleteId } = req.body;
            const deletedAccount = await Account.findByIdAndDelete(deleteId);
            if (!deletedAccount) {
                return res.status(404).json({ success: false, message: "Account record for deleting was not found" });
            }
            return res.status(200).json({ success: true, data: deletedAccount });

        default:
            return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
}

export default apiErrorHandler(accountHandler);
