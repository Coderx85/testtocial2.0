import createCustomHash from "@/hooks/customHash";
import { encodeToObjectId } from "../../../../../build/encodedObjectID";
import authService from "@/lib/appwrite";
import { connectDB } from "@/lib/connectdb";
import User from "@/models/User.modal";
import { error } from "console";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { name, username, email, password, bio } = await req.json();
  try {
    await connectDB();

    const appwriteUser = await authService.createAccount({email, password, name});
    if(!appwriteUser.userId) {
      return new NextResponse(`Failed to create ${error.name}`, { status: 404 });
    }

    const userID = createCustomHash(appwriteUser.userId);
    console.log(`UserID: ${userID.length}`);

    const newuser = new User({
      _id: new mongoose.Types.ObjectId(userID),
      appwriteID: appwriteUser.userId,
      name: name, 
      email: email, 
      username: username,
      bio: bio,
    });
    
    await newuser.save();
    console.log(`Newuser: ${newuser}`);
    return new NextResponse(`${JSON.stringify(newuser)}`, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(`Failed to create User because of ${error.message}`, { status: 500 });
  }
}