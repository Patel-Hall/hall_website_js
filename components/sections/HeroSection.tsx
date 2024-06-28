import React from 'react'
import Image from "next/image";
import {HeroProfileImage,HallEmblemWhite} from '@/public/assets';

const HeroSection = () => {
  return (
    <div className="hero" id="hero">
      <div className="hero_image_container">
        <Image 
          src={HeroProfileImage}
          alt="Hero Profile"
          className="hero_image_item"
        />
        <div className="hero_image_overlay" />
      </div>
      <div className="hero_container">
          <Image 
            src={HallEmblemWhite}
            alt="Emblem White"
            className="hero_emblem"
          />
        <h1 className="hero_title">
            Patel
          </h1>
          <h2 className="hero_subTitle">
            Hall of Residence
          </h2>
      </div>

    </div>
  )
}

export default HeroSection
