"use client"
import { motion } from 'framer-motion'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { LoginData } from '@/types'
import { useRouter } from 'next/navigation'
import authService from '@/lib/appwrite'
import Link from 'next/link'
import useAuth from '@/context/useAuth'

const initialFormData: LoginData = {
  email: '',
  password: ''
}

const Login = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const {setAuthStatus} = useAuth();

  const [formData, setFormData] = useState<LoginData>(initialFormData)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const session = await authService.login(formData)
      if (session) {
        await authService.getCurrentUser();
        setAuthStatus(true);
        router.push('/dashboard')
      } else {
        setError("Invalid email or password")
      } 
      
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!res.ok) {
        const data = await res.json()
        console.log(data)
        router.push('/dashboard')      
        return
      }
      console.log(formData)      
    } catch (err: any) {
      setError(err.message)
      console.error(err)
    }
  }

  return (
      <motion.div 
        className=" backdrop-blur-md py-8 mx-auto px-auto min-w-fit content-center h-4/5 w-full justify-center rounded-lg shadow-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </motion.div>
  )
}

export default Login