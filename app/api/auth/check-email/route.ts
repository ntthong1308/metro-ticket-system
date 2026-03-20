import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/store/users";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Email parameter is required" },
      { status: 400 }
    );
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Basic format check to avoid unnecessary work
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalizedEmail)) {
    return NextResponse.json({ exists: false });
  }

  const exists = !!findUserByEmail(normalizedEmail);
  return NextResponse.json({ exists });
}
