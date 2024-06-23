"use client"
import React from 'react'

import Link from 'next/link'
import useAuth from '@/context/useAuth'

const Navbar = () => {

  const { authStatus } = useAuth()

  return (
    <section className='float-right block container'>
          {authStatus && (
            <div className='flex gap-7 mt-5'>
              
              <Link href="/dashboard" legacyBehavior passHref>
                <div>

                  Home
                </div>
                </Link>
              
              <Link href="/users" legacyBehavior passHref>
                <div>

                  Users List
                </div>
                </Link>
              
              <Link href="/profile" legacyBehavior passHref>
                <div>

                  Profile
                </div>
                </Link>
              
              <Link href="/logout" legacyBehavior passHref>
                <div>

                  Logout
                </div>
                </Link>
            </div>
          )} 
    </section>
  )
}

export default Navbar