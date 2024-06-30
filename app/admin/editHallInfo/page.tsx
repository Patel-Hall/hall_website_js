"use client"
import React, { useEffect, useState } from 'react'
import {useSession} from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const page = () => {
    const editList=[
        {title:'Edit Logos',url:'/admin/editHallInfo/logos'},
        {title:'Edit Emblem',url:'/admin/editHallInfo/emblem'},
        {title:'Edit Hero Section',url:'/admin/editHallInfo/heroSection'},
        {title:'Edit About Us',url:'/admin/editHallInfo/aboutUs'},
        {title:'Edit Quote',url:'/admin/editHallInfo/quote'},
        {title:'Edit Contact Information',url:'/admin/editHallInfo/contactInfo'},
        {title:'Edit Theme',url:'/admin/editHallInfo/theme'},
    ];
    const {data:session}=useSession();

    if(session===null) redirect('/admin/login');



  return (
    <div className='h-screen w-full bg-secondary'>
        <div className='grid grid-cols-3 gap-2 m-2'>
            {editList.map((editSection,index)=><Link key={index} href={editSection.url} className='bg-primary px-6 py-2 mt-2'>{editSection.title}</Link>)}
        </div>
    </div>
  )
}

export default page
