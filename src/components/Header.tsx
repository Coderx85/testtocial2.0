import Link from 'next/link'
import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className='py-8 xl:py-4 text-white'>
      <div className='container mx-auto flex justify-between items-center border-red-500 border-b-4'>
        <Link href='/'>
          <h1 className='text-2xl font-semibold'>
            Testtocial <span className='text-red-500'>2.0</span>
          </h1>
        </Link>

        <div className='hidden md:flex items-center gap-8'>
          <Navbar />
        </div>
      </div>
    </header>
  )
}

export default Header