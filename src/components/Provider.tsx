"use client";
import { AuthProvider } from "@/context/authContext"
import authService from "@/lib/appwrite";
import { useEffect, useState } from "react";

const Provider = ({children}: Readonly<{
  children: React.ReactNode
}>) => {
  const [authStatus, setAuthStatus] = useState(false)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    authService.isLoggedIn()
      .then(setAuthStatus)
      .finally(() => setLoader(false))
  }, [])

  return (
    <AuthProvider value={{ authStatus, setAuthStatus }}>
      {!loader && (
        <>
          {children}
        </>
      )}  
    </AuthProvider>
  )
}

export default Provider