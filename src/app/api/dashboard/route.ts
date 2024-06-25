import { connectDB } from "@/lib/connectdb";
import Post from "@/models/Post.modal";
import User from "@/models/User.modal";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDB();

    const allPosts = await Post.find()
      .populate("author")
      .populate("likes")
      .lean();

    if (!allPosts) {
      return new NextResponse("Post not found", {status: 404})
    }

    const updatePosts = allPosts.map((post) => {
      const likesCount = post.likes.length;
      const liked = post.likes.includes(post.author._id);
      return {  ...post, likesCount, liked };
    });

    if(!updatePosts) {
      return new NextResponse("Post not updated", {status: 404})
    }

    console.log(updatePosts)
    return new NextResponse(
      JSON.stringify(updatePosts), 
      { status: 200 },
    );
  } catch (error: any) {
    return new NextResponse("Error");
  }
}