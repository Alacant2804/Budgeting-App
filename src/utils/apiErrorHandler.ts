import { NextApiRequest, NextApiResponse } from "next";

export default function apiErrorHandler(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => { // Return a function that accepts req and res
    try {
      await handler(req, res); // Call the original handler with req and res
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, message: error.message });
      } else {
        res.status(400).json({ success: false, message: 'An unknown error occurred' });
      }
    }
  };
}
