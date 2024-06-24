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
      .lean();

    if (!allPosts) {
      return new NextResponse("Post not found", {status: 404})
    }

    const updatePosts = allPosts.map((post) => {
      const likedCount = post.likes.length;
      return {  ...post, likedCount };
    });

    console.log(updatePosts)
    return new NextResponse(
      JSON.stringify(updatePosts), 
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error");
  }
}