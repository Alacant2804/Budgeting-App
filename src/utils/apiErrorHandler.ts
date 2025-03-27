import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params?: Record<string, string>;
};

export default function apiErrorHandler(
  handler: (req: NextRequest, params?: RouteParams) => Promise<NextResponse>
) {
  return async (req: NextRequest, context?: RouteParams) => {
    try {
      return await handler(req, context);
    } catch (error) {
      console.error("API Error:", error);
      return NextResponse.json(
        {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        },
        { status: 500 }
      );
    }
  };
}
