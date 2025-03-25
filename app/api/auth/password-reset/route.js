import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Send password reset email via Firebase
    await sendPasswordResetEmail(auth, email);

    return NextResponse.json({ message: "Password reset email sent successfully" });
  } catch (error) {
    // Handle specific Firebase errors
    if (error.code === "auth/user-not-found") {
      return NextResponse.json({ error: "No user found with this email" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
