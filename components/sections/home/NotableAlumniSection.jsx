import React from "react";

const NotableAlumni = ({ hallInfo }) => {
  return (
    <div className="h-auto w-full bg-secondary px-7 py-12" id="notableAlumni">
      <div className="w-fit">
        <h1
          className="text-black uppercase text-4xl"
          style={{ fontFamily: "Shango" }}
        >
          Notable Alumni
        </h1>
        <div className="h-auto w-auto flex justify-end">
          <div className="bg-primary h-[3px] w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default NotableAlumni;
