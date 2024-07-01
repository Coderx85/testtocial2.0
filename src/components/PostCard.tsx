"use client"
import { PostProps } from '@/types'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } 
from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FaClipboard, FaClock, FaComment, FaEdit, FaEllipsisH, FaHeart, FaShare, FaTrash } from 'react-icons/fa'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from "@/components/ui/menubar";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { deletePost } from "@/action/action";
import createCustomHash from "@/hooks/customHash";
import LikeButton from './LikeButton'

interface PostCardProps {
  post: PostProps
  key: any
}

const PostCard = ({post, key}: PostCardProps) => {
  const { toast } = useToast()
  
  const user = createCustomHash(post.author._id);
  const userId = user.toString();
  
  const isLiked = post.likes.includes(userId);
  // const [likeStatus, setLikeStatus] = useState(isLiked);
  // const [likes, setLikes] = useState(post.likes.length);

  console.log(isLiked)

  console.log(post._id.toString());
  
  // const handleLikeClick = async () => {
  //   const result = await toggleLikePost(post._id, userId, likeStatus);
  //   console.log(`result from LikeButton = ${result}`)
  //   if (result.success) {
  //     // Assuming the result also contains the updated likes count or a flag indicating like/unlike
  //     // Adjust this logic based on your actual implementation details
  //     setLikeStatus(!likeStatus);
  //     setLikes(prev => !likeStatus ? prev + 1 : Math.max(prev - 1, 0));
  //   } else {
  //     console.error(result.error || 'Failed to toggle like');
  //   }
  // };

  const menuItems = [
    { label: 'Edit', icon: <FaEdit />, href: `/posts/edit-post?id=${post._id}` },
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
                href={`/user/${post.author._id ?? ''}`}
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
                  <MenubarItem 
                    onClick={
                      async () => {
                        const flag = await deletePost(post._id);
                        if(flag){
                          toast({
                            title: 'Post Deleted Succesfully'
                          })
                        }
                      }
                    }
                  >
                    Delete
                    <span className="ml-auto">
                      <FaTrash />
                    </span>
                  </MenubarItem>
                  <MenubarSeparator />
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
          
          <LikeButton 
            initialLikes={post.likes.length}
            postId={post._id.toString() as string}
            userId={userId.toString() as string}
            likeStatus={isLiked}
          />
          
        {/*         
          <Button variant="outline" onClick={() => handleLikeClick()}>
            <span className='mx-auto flex gap-2'>
              {likeStatus ? <FaHeart className='text-red-500' /> : <FaHeart />} {likes}
            </span>
          </Button> 
        */}

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
