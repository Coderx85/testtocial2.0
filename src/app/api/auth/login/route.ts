import authService from "@/lib/appwrite";
import { connectDB } from "@/lib/connectdb";
import User from "@/models/User.modal";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  try {
    await connectDB();
    
    const user = await User.findOne({ email: email });
    
    if(!user) {
      return new NextResponse(`User not found ${error.name}`, { status: 404 });
    }
    console.log(user);

    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(`Failed to create User because of ${error.message}`, { status: 500 });
  }
}