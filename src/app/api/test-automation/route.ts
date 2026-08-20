import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const message = body.message || "No message provided";

    console.log(`[Next.js Backend API] Received automation task: "${message}"`);

    return NextResponse.json({
      reply: `Custom Next.js Backend processed: "${message}"`,
      processed: true,
      service: "automation-website",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error processing custom automation logic" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "online",
    service: "automation-website",
    description: "Consolidated custom automation & webhook processing endpoint",
  });
}
