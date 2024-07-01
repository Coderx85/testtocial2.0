"use client"
import authService from '@/lib/appwrite'
import { Models } from 'appwrite'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const Profile = () => {
  const [user, setUser] = useState<Models.User<Models.Preferences>| null>(null)

  useEffect(() => {
    (async () => {
      try {

        const data = await authService.getCurrentUser()
        if(data){
          try {
            const res = await fetch(`/api/profile?id=${data.$id}`,{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }        
            })
            if (!res.ok) {
              throw new Error('Something went wrong')
            }
            const newdata = await res.json()
            console.log(newdata)
            setUser(newdata)
          } catch (e: any) {
            console.error(e)
          }
        }
        // const res = await fetch(`/api/profile`,{
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   }        
        // })
        // if (!res.ok) {
        //   throw new Error('Something went wrong')
        // }

        // const newdata = await res.json()
        // setUser(data)
        // console.log(data)

      } catch (err) {
        console.error(err)
      }
  })()
}, [])

  return (
    <div className='container border-red-500 border-2 rounded-sm'>
      {user && (
        <div className='py-8'>
          <Image 
            src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} 
            alt="sdf"
            width={50} 
            height={30} 
            className="rounded-full" 
          />
          <h1>{user.name}</h1>
          <p>
            <strong>Email:</strong> {user.email}
            
          </p>
        </div>
      )}
    </div>
  )
}

export default Profile