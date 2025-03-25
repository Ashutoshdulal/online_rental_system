import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Generate JWT
    const token = jwt.sign({ uid: user.uid, email: user.email }, secret, {
      expiresIn: "1h",
    });

    return NextResponse.json({ message: "Sign-in successful", token },{ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function GET() {
    return NextResponse.json({ message: "This is the signin API. Use POST to  a user." }, { status: 200 });
  }
  