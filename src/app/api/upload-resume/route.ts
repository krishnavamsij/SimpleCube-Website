import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return NextResponse.json(
    { error: "Resume upload service is currently disabled." },
    { status: 503 },
  );
}
