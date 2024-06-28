"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { toggleLikePost } from '@/action/action'
import { FaHeart } from 'react-icons/fa'

interface LikeButtonProps {
  initialLikes: number;
  postId: string;
  userId: string;
  likeStatus: boolean
}

const LikeButton = ({ initialLikes, postId, userId,likeStatus: initialLikeStatus }: LikeButtonProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [likeStatus, setLikeStatus] = useState(initialLikeStatus);
  console.log(`postId from LikeButton = ${postId}`)
  console.log(`userId from LikeButton = ${userId}`)

  const handleLikeClick = async () => {

    const result = await toggleLikePost(postId, userId, likeStatus);
    console.log(`result from LikeButton = ${result}`)
    if (result.success) {
      setLikeStatus(!likeStatus);
      setLikes(prev => !likeStatus ? prev + 1 : Math.max(prev - 1, 0));
    } else {
      console.error(result.error || 'Failed to toggle like');
    }
  };

  return (
    <Button variant="outline" onClick={() => handleLikeClick()}>
      {likeStatus ? <FaHeart className='text-red-500' />  : <FaHeart />} {likes}
    </Button>
  )
}

export default LikeButton