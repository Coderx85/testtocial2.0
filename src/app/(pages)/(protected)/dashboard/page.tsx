"use client"
import authService from '@/lib/appwrite'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { FaComment, FaEllipsisH, FaHeart, FaShare } from 'react-icons/fa';
import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/types';
import PostCard from '@/components/PostCard';

const DashboardPage = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    (
      async () => {
        const session = await authService.getCurrentUser()
        if(session){
          try {
            const res = await fetch(`/api/dashboard`, {
              method: 'GET',
            })
  
            if (!res.ok) {
              // router.push('/login')
              throw new Error('Network response was not ok')
            }
  
            const data = await res.json()
            console.log(data)
            setPosts(data)
          } catch (err: any) {
            console.error(err)
          }
        }
        }
    )()
  }, [])

  return (
    <section className='container'>
      <div className='grid grid-cols-3 gap-5 my-5 w-full'>
        {posts.map((post) =>
          <PostCard 
            post={post}
          />   
        )}
      </div>
    </section>
  )
}

export default DashboardPage