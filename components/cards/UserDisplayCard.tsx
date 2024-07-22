import { CldImage } from "next-cloudinary";
import React from "react";
import { SocialIcon } from "react-social-icons";

interface Props {
  member: {
    imgUrl: string;
    name: string;
    facebookProfile: string;
    linkedinProfile: string;
  };
}

const UserDisplayCard = (props: Props) => {
  return (
    <div className="bg-primary w-[300px] h-[400px] rounded-lg">
      <div className="p-5">
        <CldImage
          src={props.member.imgUrl}
          alt="HCM Profile"
          className="w-auto rounded-lg"
          height={200}
          width={200}
          crop="auto"
        />
      </div>
      <div
        className="w-full flex justify-center uppercase text-lg font-bold text-secondary"
        style={{ fontFamily: "Shango" }}
      >
        {props.member.name}
      </div>
      <div className="w-full mt-7 flex flex-row gap-3 justify-center">
        <SocialIcon
          url={props.member.facebookProfile}
          target="_blank"
          fgColor="#9F212C"
          bgColor="#FFFDD0"
          style={{ height: 30, width: 30 }}
        />
        <SocialIcon
          url={props.member.linkedinProfile}
          target="_blank"
          fgColor="#9F212C"
          bgColor="#FFFDD0"
          style={{ height: 30, width: 30 }}
        />
      </div>
    </div>
  );
};

export default UserDisplayCard;
