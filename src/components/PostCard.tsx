"use client";
import { useState } from "react";
import { Post } from '@/types'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } 
from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FaClipboard, FaClock, FaComment, FaCopy, FaEdit, FaEllipsisH, FaHeart, FaRegHeart, FaShare, FaTrash } from 'react-icons/fa'
import Image from 'next/image'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: Post
}

const PostCard = ({post}: PostCardProps) => {
  const { toast } = useToast()
  const router = useRouter()
  const [likes, setLikes] = useState(post.likesCount);
  const [liked, setLiked] = useState(post.liked);

  const handleLike = () => {
    try {

      const handleLike = async () => {
        try {
          const res = await fetch(`/api/post/${post._id}/like`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId: post._id, userID: post.author._id })
          })
      
          if (res.ok) {
            // setLikes() 
          }
          throw new Error('Network response was not ok')
        } catch (err: any) {
          console.error(err.message)      
        }
      }

    } catch (err: any) {
      console.error(err.message)      
    }
  }
  
  const deleteBtn = async () => {
    try {
      const res = await fetch(`/api/post/${post._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postId: post._id, userID: post.author._id })
      })
  
      if (res.ok) {
        toast({ 
          title: 'Post Deleted',
          description: 'The post has been deleted successfully'
        })
        router.refresh()
        // setLikes() 
      }
      throw new Error('Network response was not ok')
    } catch (err: any) {
      console.error(err.message)      
      }
    }

  const menuItems = [
    { label: 'Edit', icon: <FaEdit />, href: `/posts/edit-post?id=${post._id}` },
    { label: 'Delete', icon: <FaTrash/>, href: `/posts/delete-post?id=${post._id}` },
  ]

  return (
    <section>
      <Card  className="container p-5 bg-slate-900 border-2 border-red-400">
        <CardHeader className="grid grid-cols-2 p-2 m-0 border-2 border-red-400">
          <div className='flex'>
            <Avatar>
              <AvatarImage src={`https://ui-avatars.com/api/?name=${post.author.name}&background=random`} alt="sdf" />
              <AvatarFallback>{post.author.name}</AvatarFallback>
            </Avatar>
            <div className="px-2">
              <Link 
                href={`/user/${post.author._id}`}
                className='ml-1 text-center text-red-500 content-center '
              >
                {post.author.name}
              </Link>
              <div className="flex items-center text-gray-500 text-xs mt-1">
              <FaClock /> {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>

          </div>
          <div className="text-gray-500 hover:text-gray-700 rounded ml-auto">
            <Menubar>
              <MenubarMenu>
              <MenubarTrigger>
                {/* <Button variant="outline"> */}
                  <FaEllipsisH />
                {/* </Button> */}
              </MenubarTrigger>
                <MenubarContent>
                  {menuItems.map((item, index) => (
                    <Link key={index} href={item.href}>
                      <MenubarItem>
                        {item.label}
                        <span className="ml-auto">{item.icon}</span>
                      </MenubarItem>
                      <MenubarSeparator />
                    </Link>
                  ))}
                  <MenubarItem>
                    <Button
                      onClick={deleteBtn}
                      variant="outline"
                    > 
                      Delete
                      <span className="ml-auto">
                      <FaTrash />
                      </span>
                    </Button>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => {
                      navigator.clipboard.writeText(post.content);
                      toast({
                        title: 'Copied to clipboard',
                        description: 'The post content has been copied to your clipboard.'
                      })
                    }}
                  > 
                    Copt To Clipboard
                    <span className="ml-auto">
                    <FaClipboard />
                    </span>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </CardHeader>
        <CardContent className='max-h-48 border-2 my-2 py-2 px-4 border-red-400'>
          <p>
          {post.content.trim().length > 100 ? post.content.slice(0, 100) : post.content}
          </p>
        </CardContent>
        <CardFooter className="grid grid-cols-3 gap-5 border-2 m-0 px-0 py-1 border-red-400">
          
            <Button variant="outline" onClick={handleLike}>
              {liked ? <FaHeart />: <FaRegHeart/>}
              <span>{post.likesCount}</span>
            </Button>
          
            <Button variant="outline">
              <FaComment />
              <span>{post.comments.length}</span>
            </Button>

            <Button variant="outline">
              <FaShare />
            </Button>
                      
        </CardFooter>
      </Card>
    </section>
  )
}

export default PostCard