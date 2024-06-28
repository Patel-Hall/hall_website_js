"use client"
import {signOut, useSession} from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react'

const page = () => {
  const {data:session}=useSession();

  if(session?.user===null) redirect('/admin/login');

  return (
    <div className="grid place-items-center">
      <h1>Logged into Patel Hall of Residence Admin Panel</h1>
      <h2>Name: {session?.user?.name}</h2>
      <h2>Email: {session?.user?.email}</h2>
      <button onClick={()=>signOut()} className='bg-primary px-6 py-2 mt-2'>Log out</button>
    </div>
  )
}

export default page