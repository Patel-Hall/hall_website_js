import React from "react";
import { testCouncil } from "@/constants";
import CouncilCard from "@/components/cards/CouncilCard";

const Council = ({ params }: { params: { session: string } }) => {
  return (
    <div className="h-auto bg-secondary">
      <div className="flex flex-col gap-5">
        <div
          className="w-full text-black uppercase text-5xl pt-2 flex justify-center"
          style={{ fontFamily: "Shango" }}
        >
          Hall Council
        </div>
        <div
          className="w-full text-black text-2xl flex justify-center"
          style={{ fontFamily: "Baskervville" }}
        >
          <div className="w-1/2 text-center">
            Get acquainted with the Hall Council Members of Patel Hall of
            Residence for the academic session {params.session}. These leaders
            are at the forefront of organizing events, addressing concerns, and
            fostering a strong sense of community.
          </div>
        </div>
      </div>

      <div className="pb-5">
        <div className="grid grid-cols-3 gap-5 w-full place-items-center mt-5">
          {testCouncil.map((member) => {
            return CouncilCard(member);
          })}
        </div>
      </div>
    </div>
  );
};

export default Council;
