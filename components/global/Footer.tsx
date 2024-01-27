import React from "react";
import Link from "next/link";
import { FaTwitter, FaDiscord, FaWhatsapp } from "react-icons/fa";
import Logo from "./Logo";
import Fade from 'react-reveal/Fade';


export default function Footer() {
    const copyright = (
        new Date().getFullYear()
    );
    return (
        <div className="flex flex-col items-center px-40 w-full pb-20 pt-24 bg-[black] shadow-card-upload-black first-letter:text-white text-[white]">
            <Fade bottom>
                <div className="flex flex-col items-center gap-12 lg:items-start lg:gap-0 lg:flex-row lg:justify-between w-full xl:max-w-[1000px] lg:max-w-[800px] md:max-w-[600px] scale-120">
                    <Link
                        href="/"
                        className="flex shrink-0 overflow-visible lg:mr-32 mr-0"
                    >
                        <Logo />
                    </Link>
                    <div className="flex flex-col gap-8 items-center md:gap-0 md:items-start md:justify-between w-full md:flex-row md:px-8 ">
                        <div className="flex flex-col items-center md:items-start whitespace-nowrap">
                            <div className="text-center text-xl uppercase mb-4">Address</div>
                            <div>StateLine StayOvers</div>
                            <div>200 E 49th St</div>
                            <div>Texarkana, AR 71854</div>
                            <div className="text-lg uppercase mt-5">Hours</div>
                            <div>MON - FRI</div>
                            <div>8:00AM – 7:00PM</div>
                        </div>
                        <div className="flex flex-col items-center md:items-end whitespace-nowrap">
                            <div className="text-center text-xl uppercase mb-4">Menu</div>
                            <Link href='/' className="">Home</Link>
                            <Link href='/contact'>Contact</Link>
                            <Link href='/apply-now'>Apply Now</Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 pt-20">
                    <hr className="w-20" />
                    <Link
                        href=''
                        className="relative w-[52px] h-[52px]"
                        target="_blank"
                    >
                        <div className="absolute border top-1/2 left-1/2 w-12 h-12 rotate-45 -translate-y-1/2 -translate-x-1/2">
                            <FaTwitter className="text-3xl -rotate-45 mt-2 ml-2" />
                        </div>
                    </Link>
                    <Link
                        href=''
                        className="relative w-[52px] h-[52px]"
                        target="_blank"
                    >
                        <div className="absolute border top-1/2 left-1/2 w-12 h-12 rotate-45 -translate-y-1/2 -translate-x-1/2">
                            <FaDiscord className="text-3xl -rotate-45 mt-2 ml-2" />
                        </div>
                    </Link>
                    <Link
                        href=''
                        className="relative w-[52px] h-[52px]"
                        target="_blank"
                    >
                        <div className="absolute border top-1/2 left-1/2 w-12 h-12 rotate-45 -translate-y-1/2 -translate-x-1/2">
                            <FaWhatsapp className="text-3xl -rotate-45 mt-2 ml-2 shrink-0" />
                        </div>
                    </Link>
                    <hr className="w-20" />
                </div>
            </Fade>
        </div>
    );
}
