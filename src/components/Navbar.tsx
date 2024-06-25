"use client"
import React from 'react'

import Link from 'next/link'
import useAuth from '@/context/useAuth'
import Home from '@/app/(pages)/page'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { FaCreativeCommons, FaHome, FaPlus, FaUserCircle, FaUsers } from 'react-icons/fa'
import { HiLogout } from 'react-icons/hi'

interface NavbarProps {
  name: string,
  link: string,
  icon: React.ReactNode
}

const navbarData : NavbarProps[] = [
  {
    name: "Home",
    link: "/dashboard",
    icon: <FaHome />
  },
  {
    name: 'Create Post',
    link: '/posts/create-post',
    icon: <FaPlus />
  },
  {
    name: "User List",
    link: "/users",
    icon: <FaUsers />
  },
  {
    name: 'Profile',
    link: '/profile',
    icon: <FaUserCircle />
  },
  {
    name: 'Logout',
    link: '/logout',
    icon: <HiLogout />
  },
  // {
  //   name: '',
  //   link: ''
  // },
]

const Navbar = () => {

  const { authStatus } = useAuth()
  const pathname = usePathname()

  return (
    <section className='float-right block'>
          {authStatus && (
            <div className='flex gap-7 mb-5'>

              {navbarData.map((data, index) => {
                return(
                  <Link 
                    href={`${data.link}`} 
                    key={index}
                    legacyBehavior passHref
                  >
                    <Button 
                      className={(`${data.link === pathname && "text-red-500 capitalize border-red-500"} bg-transparent text-md
                         hover:text-red-500 hover:bg-transparent text-md`)}
                    >
                      <span className='px-1'>
                        {data.icon} 
                      </span>
                        {data.name}
                    </Button>
                  </Link>
                )
              }
              )}


              </div>
          )} 
    </section>
  )
}

export default Navbar