import React from 'react'
import {HomeNavBarLogo} from '@/public/assets'
import Image from 'next/image'
import Link from 'next/link'
import {navBarItems} from '@/constants'

const HomeNavBar = () => {
  return (
    <nav className='home_navBar'>
        <Link href='/' className='home_navBar_logo'>
            <Image 
                src={HomeNavBarLogo}
                alt="home-logo"
            />
        </Link>
        <div className='home_navBar_items'>
            {navBarItems.map((link,index)=>{
              return (
                <div key={index} className='home_navBar_item'>
                  <Link
                    href='/'
                    className='home_navBar_link'
                  >
                      <p>{link}</p>
                  </Link>
                </div>
              )
            })}
        </div>
    </nav>
  )
}

export default HomeNavBar
