"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import useAuth from '@/context/useAuth'
import authService from '@/lib/appwrite'

const LogoutPage = () => {
  const router = useRouter()
  const {setAuthStatus} = useAuth()

  useEffect(() => {
    authService.logout()
    .then(
      () => {
        setAuthStatus(false)
        router.replace('/')
      }
    )
  }, [])

  return (
    <></>
  )
}

export default LogoutPage