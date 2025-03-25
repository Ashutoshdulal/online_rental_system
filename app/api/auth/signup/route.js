import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const token = jwt.sign({ uid: user.uid, email: user.email }, secret, {
      expiresIn: "1h",
    });

    return NextResponse.json({ message: "User created", token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "This is the signup API. Use POST to create a user." }, { status: 200 });
}
