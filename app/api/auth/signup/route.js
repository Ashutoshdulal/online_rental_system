import { NextResponse } from "next/server";
import { auth, db, storage } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    const { email, password, name, profilePicture } = await request.json();

    // Create authentication user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    let profilePictureUrl = "";
    
    // Upload profile picture if provided
    if (profilePicture) {
      const storageRef = ref(storage, `profile-pictures/${user.uid}`);
      await uploadString(storageRef, profilePicture, 'data_url');
      profilePictureUrl = await getDownloadURL(storageRef);
    }

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      profilePictureUrl,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    const token = jwt.sign({ uid: user.uid, email: user.email }, secret, {
      expiresIn: "1h",
    });

    return NextResponse.json({ 
      message: "User created", 
      token,
      profilePictureUrl 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "This is the signup API. Use POST to create a user." }, { status: 200 });
}
