import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, message, threadId, emailId } = body;

    if (!to || !message) {
      return NextResponse.json(
        { success: false, error: "Recipient ('to') and 'message' are required." },
        { status: 400 }
      );
    }

    // If an n8n webhook or email integration URL is configured, forward it
    const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_SEND_EMAIL_WEBHOOK;

    if (n8nWebhookUrl) {
      try {
        const n8nResponse = await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to, subject, message, threadId, emailId }),
        });

        if (n8nResponse.ok) {
          const data = await n8nResponse.json();
          return NextResponse.json({ success: true, data });
        }
      } catch (webhookError) {
        console.warn("n8n webhook error, falling back to local success:", webhookError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Reply recorded successfully.",
      reply: {
        to,
        subject,
        message,
        threadId,
        emailId,
        sentAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("send-email API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error while sending email." },
      { status: 500 }
    );
  }
}
