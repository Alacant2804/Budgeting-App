import { NextRequest, NextResponse } from "next/server";

export default function apiErrorHandler(
  handler: (
    req: NextRequest,
    params?: { params?: any }
  ) => Promise<NextResponse>
) {
  return async (req: NextRequest, context?: { params?: any }) => {
    try {
      return await handler(req, context);
    } catch (error) {
      console.error("API Error:", error);
      if (error instanceof Error) {
        return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
        );
      } else {
        return NextResponse.json(
          { success: false, message: "An unknown error occurred" },
          { status: 400 }
        );
      }
    }
  };
}
