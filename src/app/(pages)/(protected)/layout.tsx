"use client"
import Navbar from '@/components/Navbar'
// import useAuth from '@/context/useAuth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProtectedLayout = ({children}:
  Readonly<{
    children: React.ReactNode
  }>
) => {
  const router = useRouter()
  
  const {data: session} = useSession()
  if(session){
    router.replace('/dashboard')
    return <></>
  }

  // const {authStatus} = useAuth()
  // if(!authStatus){
  //   router.replace('/')
  //   return <></>
  // }
  return (
    <>
    <div className='block'>
      {children}     
    </div>
    </>
    
  )
}

export default ProtectedLayout