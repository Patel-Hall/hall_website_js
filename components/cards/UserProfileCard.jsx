"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import UserDisplayCard from "./UserDisplayCard";

const UserProfileCard = () => {
    const { data } = useSession();
    const [patelian, setPatelian] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUserDetails();
    }, [session]);

    const getUserDetails = async () => {
        console.log(session?.user?.email);
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/user/getUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: session?.user?.email }),
            });
            const data = await response.json();
            console.log(data.patelian.instiEmail);

            if (response.ok) {
                setPatelian(data.patelian);
                setError("");
            } else {
                setError(data);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error Encountered</p>
                ) : (
                    <div className="p-10 border-primary border-4 bg-white flex flex-row gap-5 shadow-lg rounded-lg">
                        <div className="bg-primary py-3 px-2">
                            <UserDisplayCard
                                member={{
                                    imgUrl: patelian.profileImageUrl,
                                    name: patelian.name,
                                    facebookProfile: patelian.facebookProfile,
                                    linkedinProfile: patelian.linkedinProfile,
                                }}
                            />
                        </div>
                        <div className="flex flex-col justify-evenly px-2">
                            <div>Name: {patelian.name}</div>
                            <div>Email: {patelian.email}</div>
                            <div>Institute Email: {patelian.instiEmail}</div>
                            <div>Roll No: {patelian.rollNo}</div>
                            <div>Room No: {patelian.roomNo}</div>
                            <div>Contact: {patelian.contact}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfileCard;
