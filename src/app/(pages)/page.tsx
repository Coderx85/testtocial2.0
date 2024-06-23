"use client"
import Login from "@/components/Login";
import useAuth from "@/context/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const {authStatus} = useAuth();

  if(authStatus){
    router.replace('/dashboard');
    return <></>;
  }
  
  return (
    <main className="grid grid-cols-2 min-h-screen p-24">
      <div className="flex text-center px-auto mx-auto items-center">
        <p>
          Welcome to our website! We are a group of developers who are passionate about creating web applications. We hope you enjoy your stay.
        </p>
      </div>
      <div className=" p-12 bg-slate-800">
        <Login />
        <Link href="/register" className='pt-16 underline text-blue-700 mx-auto px-auto'>
          Create an account
        </Link>
      </div>
    </main>
  );
}