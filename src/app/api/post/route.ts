import createCustomHash from "@/hooks/customHash";
import { connectDB } from "@/lib/connectdb";
import Post from "@/models/Post.modal";
import User from "@/models/User.modal";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectDB();
    const sessionID = req.url.split("=")[1];
    // console.log(sessionID)

    const post = await Post.findById(sessionID).populate("author").lean();

    if (!post) {
      console.log("Post Not Found")
      return new NextResponse("Post Not Found", { status: 404 });
    }

    console.log(post)

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error: any) {
    console.error(error.message)
    return new NextResponse(
      "Error",
      {status : 500}
    )
  }
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { content } = await req.json();
    await connectDB();
    const sessionID = req.url.split("=")[1];
    const userID = createCustomHash(sessionID);

    const user = await User.findOne(
      { _id : userID },
    );

    if(user){
      const post = new Post({
        author: user,
        content: content,
      });
  
      console.log(post)
  
      await post.save();
  
      return new NextResponse(JSON.stringify(post), { status: 200 });
    }
  } catch (error: any) {
    return console.error(error);
  }
}

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  try {
    const { content } = await req.json();
    await connectDB();
    const sessionID = req.url.split("=")[1];
    const post = await Post.findById(sessionID);

    if (!post) {
      console.log("Post Not Found")
      return new NextResponse("Post Not Found", { status: 404 });
    }

    post.content = content;

    await post.save();
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error: any) {
    return console.error(error);
  }
}