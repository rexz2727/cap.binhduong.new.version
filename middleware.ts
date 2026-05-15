// TODO: Task S3 (Security) — Basic Auth cho /studio + rate limit headers
// Implement sau khi có STUDIO_BASIC_USER và STUDIO_BASIC_PASS trong .env.local
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*"],
};
