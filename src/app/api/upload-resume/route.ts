import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Resume upload service is currently disabled." },
    { status: 503 },
  );
}
