import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  try {
    // Get Authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization token is required" },
        { status: 401 }
      );
    }

    // Expected format:
    // Authorization: Bearer <JWT>

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return NextResponse.json(
        { error: "Invalid authorization format" },
        { status: 401 }
      );
    }

    const token = parts[1];

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Ask Supabase to validate the JWT
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Retrieve only the logged-in user's data
    const { data, error: dbError } = await supabase
      .from("superblockusers")
      .select("id, full_name, email")
      .eq("id", user.id)
      .single();

    if (dbError) {
      console.error("Database error:", dbError);

      return NextResponse.json(
        { error: "Unable to retrieve user data" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Authorized successfully",
      user: data,
    });

  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}