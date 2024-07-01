import React from 'react'
import { getAllPost } from '@/action/action';
import { createNewPost } from '@/action/action';
import authService from '@/lib/appwrite';
import PostForm from '@/components/PostForm';

const TestPage = async () => {

  const post = await getAllPost();

  return (
    <div className='mx-auto container'> 
      <PostForm />
      {/* <form 
        action={
          createNewPost
        }
      >
        <input type="text" hidden='true' value={userId} />
        <input type='text' name='content' value='content' />
        <input type='submit' value='submit' /> 
      </form> */}

      <h1 className='text-red-500 text-3xl'>Post</h1>
      <div className='grid grid-cols-3'>
      {post && post.map((post) => (
        <div className='bg-cyan-700 border-cyan-700 border-6' key={post._id}>
            <p>{post.author.name}</p>
            <h1 className='text-4xl'>{post.content}</h1>
        </div>
      ))}
      </div>
   
    </div>
  )
}

export default TestPage