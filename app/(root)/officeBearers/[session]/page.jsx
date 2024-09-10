"use client";
import { Council, Footer, NavBar } from "@/components";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
    const [hallInfo, setHallInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHallInfo = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/getHallInfo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();

            if (response.ok) {
                setHallInfo(data.hallInfo);
            } else {
                setError(data);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHallInfo();
    }, []);
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error</p>
            ) : (
                <div>
                    <NavBar hallInfo={hallInfo} />
                    <Council params={params} />
                    <Footer hallInfo={hallInfo} />
                </div>
            )}
        </div>
    );
};

export default page;
