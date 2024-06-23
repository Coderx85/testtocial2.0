"use client"
import Register from '@/components/Register'
import useAuth from '@/context/useAuth';
import { useRouter } from 'next/navigation';
import React from 'react'

const RegisterPage = () => {
  const {authStatus} = useAuth() ;
  const router = useRouter();

  if(authStatus){
    router.replace('/dashboard')
    return <></>
  }
  return (
    <Register />
  )
}

export default RegisterPage