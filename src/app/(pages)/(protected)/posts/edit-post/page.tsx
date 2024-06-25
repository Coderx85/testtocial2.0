"use client"
import PostForm from '@/components/PostForm'
import authService from '@/lib/appwrite'
import { Post } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
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

// const initialValues : Post= {
//   author: '',
//   content: '',
//   likes: [],
//   comments: [],
//   // file: Buffer.from('')
// }

const editPost = () => {

  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const [data, setData] = useState<Post>({
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
  })
  const [content, setContent] = useState('');

  const [submitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const backBtn = () => {
    router.replace('/dashboard')
  }

  useEffect(() => {
    (
      async () => {
        const session = await authService.getCurrentUser()
        if(session){
          try {
            const res = await fetch(`/api/post?=${id}`, {
              method: 'GET',
            })

            if (!res.ok) {
              // router.push('/login')
              throw new Error('Network response was not ok')
            }

            const data = await res.json()
            console.log(data)
            setData(data)
            setContent(data.content)
          } catch (err: any) {
            console.error(err)
          }
        }
        }
    )()
  }, [])

  const editpost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/post?=${id}`, {
        method: 'PATCH',
        body: JSON.stringify({content}),
      })

      if(res.ok) {
        router.push('/dashboard')
      }

      const newData = await res.json()

      console.log(res)
      setData(newData)

    } catch (err: any) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='w-full '>
      {/* <PostForm 
        data={initialValues} 
        setData={setData}
        handleSubmit={editpost}
        submitting={submitting}
      /> */}
      {data && (
        <Card className='container pt-10'>
          <CardHeader>
            <CardTitle>{data.author.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={editpost}>
              <div className="grid w-full items-center gap-4">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  name="author" 
                  value={content}
                  className='h-[60vh]'
                  placeholder={`Write your content here...`} 
                  onChange={(e) => setContent(e.target.value)} 
                />
              </div>
              <Button variant="outline" onClick={() => backBtn()}>Cancel</Button>
              <Button 
                type="submit"
                disabled={submitting}
                >edit
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default editPost