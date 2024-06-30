"use server"

import authService from '@/lib/appwrite';
import { connectDB } from '@/lib/connectdb';
import { revalidatePath } from 'next/cache';
import Post from '@/models/Post.modal';
import { PostProps } from '@/types';
import User from '@/models/User.modal';
import { useToast } from '@/components/ui/use-toast';
import { NextResponse } from 'next/server';

type Result =
  | {
      success: true;
      
    }
  | {
      success: false;
      error: string;
    };

type Post = 
  | {

  }
  | {

  }

export async function getAllPost() {
  await connectDB();
  const posts = await Post.find({}) 
  .populate('author', 'name')
  .lean() as PostProps[];
  
  console.log(posts);
  return posts.map(post => ({
    ...post,
    _id: post._id?.toString(),
    author: {
      ...post.author,
      _id: post.author._id.toString()
    }
  }));
}

export async function createNewPost(formData: FormData): Promise<Result> {
  try {
    await connectDB();

    const content = formData.get('content') as string;
    const author = formData.get('author') as string;
    console.log(`Author = ${author}`)

    const user = await User.findOne(
      { _id: author }
    )
    
    const post = new Post({ 
      author: user,
      content,
    });
    console.log(post)

    const flag = await post.save();
    if(!flag)
      return { success: false, error: `Failed to add Post`}

  } catch (error: any) {
    return { success: false, error: "Failed to add Post" };
  }
  
  revalidatePath('/');
  console.log(`HELL I did it`)
  return { success: true };
}

export async function deletePost(postId: string) {
  try {
    await connectDB()

    const flag = await Post.findOneAndDelete(
      { _id: postId }
    )

    if(!flag)
      return {success: false, error: 'Failed to Delete Post'}

  } catch (e) {
    return { success: false, error: `Failed to delete Post because of ${e}` }
  }
  revalidatePath('/');
  console.log(`HELL I did it`)
  return { success: true };
}

export async function toggleLikePost(postId: string, userId: string, isLiked: boolean): Promise<Result> {
  try {
    await connectDB();

    console.log(`PostId = ${postId}`)
    console.log(`UserId = ${userId}`)

    const post = await Post.findById({
      _id: postId
    });
    
    if (!post) {
      // new NextResponse("Error",{ status: 404 });
      return { success: false, error: "Post not found" };
    }

    // const isLiked = post.likes.includes(userId);
    // console.log(`isLiked = ${isLiked}`)
    // if (isLiked) {
    //   post.likes = post.likes.filter((id: string) => id.toString() !== userId.toString());
    //   if(post.likes){
    //     new NextResponse("Error",{ status: 404 });
    //     return { success: false, error: "Post can't be Like" };
    //   }
    //   console.log(`Post.likes = ${post.likes}`)
    // } else {
    //   post.likes.push(userId);
    // }

    // await post.save();

    if(isLiked===true){
      post.likes.push(userId);

      await post.save();
      console.log('Post liked successfully');
    }
    else{
      const index = post.likes.indexOf(userId);
      post.likes.splice(index, 1);

      await post.save();
      console.log('Post disliked successfully');
    }
    // new NextResponse("Error",{ status: 500 });
  } catch (error: any) {
    // new NextResponse("Error",{ status: 500 });
    console.log(`Error = ${error}`)
    return { success: false, error: error.message || "Failed to toggle like on post" };
  }

  revalidatePath('/');
  return { success: true };
}