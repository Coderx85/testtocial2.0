"use client"
import React, {Dispatch, FormEvent, useActionState, useEffect, useRef, useState} from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// import { Post } from '@/types';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { createNewPost } from '@/action/action';
import authService from '@/lib/appwrite';
import createCustomHash from '@/hooks/customHash';
import { Input } from './ui/input';
import { useFormStatus } from 'react-dom';

// interface PostFormProps {
//   data: Post,
//   setData: Dispatch<React.SetStateAction<Post>>,
//   handleSubmit: (e: FormEvent<HTMLFormElement>) => void,
//   submitting: boolean
// }

export default function PostForm() {
  const [error, setError] = useState<string | null>(null); 
  const formRef = useRef<HTMLFormElement>(null);
  const [userID, setUserID] = useState("");
  const [loading, setLoading] = useState(false);
  const { pending } = useFormStatus()

  useEffect(() => {
    (
      async () => {
        const session = await authService.getCurrentUser()
        if(session){
          console.log(`Session - ${session.$id}`)
          const data = createCustomHash(session.$id)
          console.log(`USer ID is ${data}`)
          
          setUserID(data)
          // console.log(`Appwrite Id - ${s}`)
        }}
    )()
  }, [])

  // const [ state, action, isPending ] = useActionState(createNewPost);
  
  return (
    <section className='h-[100vh]'>
      <Card className='container pt-10'>
        {/* <CardHeader>
          <CardTitle>{data.author._id}</CardTitle>
        </CardHeader> */}
        <CardContent>
          <form action={
            async (formData: FormData) => {
              setError(null);
              const content = formData.get('content')
              if (typeof content !== "string" || content.length === 0) {
                setError("content cannot be empty");
                return;
              }
              if (content.length > 140) {
                setError("content cannot be longer than 140 characters");
                return;
              }

              formData.append('author', userID)

              const result = await createNewPost(formData);
              if (result.success === false) {
                setError(result.error);
                return;
              }
              // form.current?.reset();
            }}
            ref={formRef}
          >
            <div className="grid w-full items-center gap-4">
              <Input 
                name='author'
                id='author'
                value={userID}
              />
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                name="content"
                className='h-[60vh]'  
                placeholder={`Write your content here...`} 
              />
            </div>
            <Button 
              type="submit"
              disabled={pending}
              >Deploy
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
        </CardFooter>
      </Card>
    </section>
  );
};