import { AuthUser, Post } from '@/types'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } 
from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FaComment, FaEllipsisH, FaHeart, FaShare } from 'react-icons/fa'
import Image from 'next/image'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"


interface PostCardProps {
  post: Post
}

const PostCard = ({post}: PostCardProps) => {
  return (
    <section>
      <Card  className="container p-5 bg-slate-900 border-2 border-red-400">
        <CardHeader className="grid grid-cols-2 p-2 m-0 border-2 border-red-400">
          <div className='flex'>
            <Image 
              src={`https://ui-avatars.com/api/?name=${(post.author as AuthUser).name}&background=random`} 
              alt="sdf"
              width={50} 
              height={30} 
              className="rounded-full" 
            />
            <Link 
              href={`/user/${(post.author as AuthUser)._id}`}
              className='ml-1 text-center text-neutral-600 content-center '
            >
              {(post.author as AuthUser).name}
            </Link>

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
                  <Link href={`/posts/edit-post?id=${post._id}`}>
                    <MenubarItem>
                      Edit
                    </MenubarItem>
                  </Link>
                  <MenubarSeparator />
                  <Link href={`/posts/delete-post?id=${post._id}`}>
                    <MenubarItem>
                      Delete
                    </MenubarItem>
                  </Link>
                  {/* <MenubarItem>
                    <Link href={`/post/`}>
                      Share
                    </Link>
                  </MenubarItem> */}
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
          
            <Button variant="outline">
              <FaHeart />
              <span>{post.likes}</span>
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