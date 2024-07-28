"use client";
import React, { useEffect, useState } from "react";
import CouncilCard from "@/components/cards/CouncilCard";

interface CouncilMember {
  name: string;
  post: string;
  portfolio: string;
  imgUrl: string;
  facebookProfile: string;
  linkedinProfile: string;
}

const Council = ({ params }: { params: { session: string } }) => {
  const [council, setCouncil] = useState<CouncilMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getCouncilDetails();
  }, []);

  const getCouncilDetails = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/user/getCouncil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session: params.session }),
      });
      const data = await response.json();

      if (response.ok) {
        setCouncil(data.council);
        console.log(data.council);
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-auto bg-secondary">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error Encountered</p>
      ) : (
        <div>
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
                Residence for the academic session {params.session}. These
                leaders are at the forefront of organizing events, addressing
                concerns, and fostering a strong sense of community.
              </div>
            </div>
          </div>

          <div className="pb-5">
            <div className="grid grid-cols-3 gap-5 w-full place-items-center mt-5">
              {council.map((member: CouncilMember) => {
                return <CouncilCard member={member} />;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Council;
