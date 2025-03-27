import { NextResponse } from "next/server";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: unknown[];
}

export function createApiResponse<T>(
  data: T,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

export function createErrorResponse(
  message: string,
  errors?: unknown[],
  status: number = 400
): NextResponse<ApiResponse> {
  return NextResponse.json({ success: false, message, errors }, { status });
}

export function parseId(id: string | undefined): number | null {
  if (!id) return null;
  const parsedId = parseInt(id);
  return isNaN(parsedId) ? null : parsedId;
}
