import { NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  "https://n8n-production-dd18.up.railway.app/webhook/test-webhook";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const message = body.message || "Hello from Next.js Dashboard!";

    console.log(`[Next.js API] Forwarding trigger with message: "${message}" to n8n webhook...`);

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `n8n webhook error (${response.status}): ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json().catch(async () => ({ raw: await response.text() }));
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("[Next.js API] Trigger Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error connecting to webhook" },
      { status: 500 }
    );
  }
}
