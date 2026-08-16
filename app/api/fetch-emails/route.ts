import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://sanasalmayakup.app.n8n.cloud/webhook/1187ea86-ea29-4ee9-a6e3-8a4a9fc9ea3a",
      {
        cache: "no-store",
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to connect to n8n",
      },
      { status: 500 }
    );
  }
}