"use client"
import Navbar from '@/components/Navbar'
import useAuth from '@/context/useAuth'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProtectedLayout = ({children}:
  Readonly<{
    children: React.ReactNode
  }>
) => {
  const {authStatus} = useAuth()
  const router = useRouter()
  if(!authStatus){
    router.replace('/')
    return <></>
  }
  return (
    <>
    <div className='block'>
      {children}     
    </div>
    </>
    
  )
}

export default ProtectedLayout