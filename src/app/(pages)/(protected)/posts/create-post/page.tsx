"use client"
import PostForm from '@/components/PostForm'
import authService from '@/lib/appwrite'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Post } from '@/types'
import { Models } from 'appwrite'
import { useToast } from '@/components/ui/use-toast'

// const initialValues : Post= {
//   author: '',
//   content: '',
//   likes: [],
//   comments: [],
//   // file: Buffer.from('')
// }

const createPost = () => {

  const {toast} = useToast()
  const router = useRouter()

  const [post, setPost] = useState<Post>({
    author: {
      _id: '',
      appwriteID: '',
      name: '',
      username: '',
      bio: '',
      userPosts: [],
      likedPosts: [],
      email: '',
      password: ''
    },
    content: '',
    likes: [],
    comments: [],
    likesCount: 0,
    liked: false,
    createdAt: 0,

  })

  const [data, setData] = useState<Models.User<Models.Preferences>>()

  const [submitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setPost((prevData) => ({ ...prevData, [name]: value }));
  // };

  useEffect(() => {
    (
      async () => {
        const session = await authService.getCurrentUser()
        if(session) {
          setData(session)
        }
      }
    )()
  }, [])

  const createpost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const session = await authService.getCurrentUser()
      if(session){
        try {
          const res = await fetch(`/api/post?=${session.$id}`, {
            method: 'POST',
            body: JSON.stringify({
              content : post.content
            })
          })
    
          if(res.ok) {
            router.push('/dashboard')
            toast({
              title: 'Post created successfully',
              description: 'Your post has been created successfully'
            })
          }
  
          const newData = await res.json()
    
          console.log(res)
          setPost(newData)
        } catch (err: any) {
          console.error(err)
        } finally {
          setIsSubmitting(false)
        }
      }
    }

  return (
    <div className='w-full'>
      {/* <PostForm 
        data={initialValues} 
        setData={setData}
        handleSubmit={createpost}
        submitting={submitting}
      /> */}
      <Card className='container pt-10'>
        <CardHeader>
          <CardTitle>{data?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={createpost}>
            <div className="grid w-full items-center gap-4">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                name="author" 
                value={post.content}
                className='h-[50vh]'
                placeholder={`Write your content here...`} 
                onChange={(e) => setPost({...post, content: e.target.value})} 
              />
            </div>
            <Button 
              type="submit"
              disabled={submitting}
              className='ml-auto m-0 '
              >Create
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default createPost