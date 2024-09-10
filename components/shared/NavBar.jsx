"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { navBarItems } from "@/constants";
import { CldImage } from "next-cloudinary";
import { HiMenuAlt4, HiX } from "react-icons/hi";

const NavBar = ({ hallInfo }) => {
    const [toggle, setToggle] = useState(false);
    const [firstHalf, setFirstHalf] = useState([]);
    const [secondHalf, setSecondHalf] = useState([]);

    useEffect(() => {
        const middle = Math.floor(navBarItems.length / 2);
        setFirstHalf(navBarItems.slice(0, middle));
        setSecondHalf(navBarItems.slice(middle));
    }, []);

    return (
        <div>
            <nav
                className="bg-primary text-secondary hidden md:flex md:flex-row w-full items-center justify-center gap-5 px-1 md:px-2 lg:px-4 xl:px-7 py-3"
                id="navBar"
            >
                <div
                    className="flex flex-1 justify-end gap-3 md:gap-4 lg:gap-7 xl:gap-12 md:mx-1 lg:mx-3 xl:mx-5"
                    style={{ fontFamily: "Shango" }}
                >
                    {firstHalf.map((link, index) => {
                        return (
                            <div
                                key={index}
                                className="flex-col text-sm md:text-md lg:text-lg xl:text-xl"
                            >
                                <Link
                                    href={link.link}
                                    className="no-underline uppercase flex-col"
                                >
                                    <p>{link.name}</p>
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <Link href="/" className="flex items-center justify-start">
                    <CldImage
                        src={hallInfo.dragonLogoUrl}
                        alt="home-logo"
                        height={100}
                        width={100}
                        className="h-[30px] w-[30px] md:h-[50px] md:w-[50px] lg:h-[60px] lg:w-[60px] xl:h-[70px] xl:w-[70px]"
                    />
                </Link>
                <div
                    className="flex flex-1 justify-start gap-3 md:gap-4 lg:gap-7 xl:gap-12 md:mx-1 lg:mx-3 xl:mx-5"
                    style={{ fontFamily: "Shango" }}
                >
                    {secondHalf.map((link, index) => {
                        return (
                            <div
                                key={index}
                                className="flex-col text-sm md:text-md lg:text-lg xl:text-xl"
                            >
                                <Link
                                    href={link.link}
                                    className="no-underline uppercase flex-col"
                                >
                                    <p>{link.name}</p>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </nav>
            <div className="fixed z-30 w-full h-auto flex justify-end md:hidden">
                <div className="">
                    {!toggle && (
                        <div className="bg-primary rounded-full mx-3 my-1">
                            <HiMenuAlt4
                                className="h-9 w-9"
                                onClick={() => setToggle(true)}
                            />
                        </div>
                    )}

                    {toggle && (
                        <div className="h-screen w-full bg-primary opacity-90 text-secondary text-lg flex justify-end items-end flex-col">
                            <HiX
                                className="h-9 w-9 bg-secondary fill-primary rounded-full"
                                onClick={() => setToggle(false)}
                            />
                            <ul className="list-none h-full w-full flex justify-start items-start flex-col">
                                {navBarItems.map((item) => (
                                    <li key={item.name} className="m-4">
                                        <a
                                            className="no-underline uppercase font-bold"
                                            href={item.link}
                                            onClick={() => setToggle(false)}
                                            style={{ fontFamily: "Shango" }}
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
