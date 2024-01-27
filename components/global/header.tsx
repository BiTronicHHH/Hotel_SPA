import React, { useEffect } from 'react'
import Image from 'next/image'
import { Fragment } from 'react'
import Link from 'next/link'
import { Popover, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { arrayToTree, classNames, getLinkProps, useOnce } from "../../utils/misc";
import { FaLayerGroup, FaTimes, FaSearch, FaSearchengin, FaBlog, FaMicroblog, FaNewspaper, FaNapster, FaGofore, FaQuestion, FaPhoneAlt, FaLocationArrow, FaChessKing } from 'react-icons/fa';
import Menu from './Menu';
import Logo from './Logo';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { AlertState } from '@/components/utils/misc';
import { all } from 'gensync';

const themeColors = {
    blue: {
        mobileMenu: {
            divide: "divide-white",
            close: "text-white",
            bg: "from-blue-very-dark to-blue-dark",
            iconsBg: "",
            item: {
                normal: "text-[#555] hover:text-[black]",
                active: "text-[black]",
            },
        },
        desktopMenu: {
            item: {
                normal: "text-[#ddd] hover:text-white",
                active: "text-[black]",
            },
        },
        subMenu: {
            item: {
                normal: "text-white hover:scale-105 hover:text-white",
                active: "text-[black]",
            },
        },
    },
};


const DesktopMenu = () => {
    // const theme = useContext(ThemeContext)
    const router = useRouter();
    const { asPath } = router;
    const lastSegment = asPath.split('/').pop();
    const [current, setCurrent] = React.useState<string | undefined>(lastSegment);

    const [alertState, setAlertState] = React.useState<AlertState>({
        open: false,
        message: '',
        severity: undefined,
    })
    const buttonClass = "p-2 text-lg font-semibold font-header transition-colors cursor-pointer";

    return (
        <Popover.Group className="max-md:hidden flex items-center space-x-5 sm:space-x-10 ">
            <div className="flex space-x-0 sm:space-x-6 z-10 spec-div">
                <Link
                    href="/"
                    className={`${buttonClass} ${current == '' ? ' border-b-4 border-white text-white' : 'spec-hover'} uppercase  `}
                >
                    Home
                </Link>
                <Link
                    href="/properties"
                    className={`${buttonClass} ${current == 'properties' ? 'border-b-4 border-white text-white' : 'spec-hover'} uppercase  `}
                >
                    Properties
                </Link>
                <Link
                    href="/contact"
                    className={`${buttonClass} ${current == 'contact' ? 'border-b-4 border-white text-white' : 'spec-hover'} uppercase  `}
                >
                    Contact
                </Link>

                <Snackbar
                    open={alertState.open}
                    autoHideDuration={6000}
                    onClose={() => setAlertState({ ...alertState, open: false })}
                >
                    <Alert
                        onClose={() => setAlertState({ ...alertState, open: false })}
                        severity={alertState.severity}
                        className='text-[red]'
                    >
                        {alertState.message}
                    </Alert>
                </Snackbar>
            </div>
        </Popover.Group>
    );
};

const mobileNavItemClass = "block px-2 py-3 text-xl font-header";

const MobileMenu = () => {
    // const theme = useContext(ThemeContext)
    return (
        <Popover className='z-50'>
            <Popover.Button className="block md:hidden font-medium focus-[white]">
                <span className="sr-only">Open main menu</span>
                <FaLayerGroup className="h-8 w-8 mr-6 text-white hover:scale-105 duration-500 " aria-hidden="true" />
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel
                    focus
                    className="absolute z-20 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden bg-[white]"
                >
                    <div
                        className={classNames(
                            "relative rounded-lg  ring-1 ring-black ring-opacity-5 overflow-hidden bg-[#ccc]",
                            themeColors["blue"].mobileMenu.bg
                        )}
                    >
                        <Popover.Button
                            className={classNames(
                                "absolute z-10 op-0 right-0 box-content p-3 inline-flex items-center justify-center focus-white",
                                themeColors["blue"].mobileMenu.close
                            )}
                        >
                            <span className="sr-only">Close main menu</span>
                            <FaTimes className="h-8 w-8 text-[#555] hover:text-[black]" aria-hidden="true" />
                        </Popover.Button>

                        <div className="relative pt-10">
                            <div
                                className={classNames(
                                    "px-5 divide-y",
                                    themeColors["blue"].mobileMenu.divide
                                )}
                            >
                                <Fragment>
                                    <Link
                                        href=""
                                        className={classNames(
                                            mobileNavItemClass,
                                            themeColors["blue"].mobileMenu.item["normal"]
                                        )}
                                    >
                                        HOME
                                    </Link>
                                </Fragment>
                                <Fragment>
                                    <Link
                                        href="/properties"
                                        className={classNames(
                                            mobileNavItemClass,
                                            themeColors["blue"].mobileMenu.item["normal"]
                                        )}
                                    >
                                        PROPERTIES
                                    </Link>
                                </Fragment>
                                <Fragment>
                                    <Link
                                        href="/contact"
                                        className={classNames(
                                            mobileNavItemClass,
                                            themeColors["blue"].mobileMenu.item["normal"]
                                        )}
                                    >
                                        CONTACT
                                    </Link>
                                </Fragment>
                                <Fragment>
                                    <Link
                                        href="/apply"
                                        className={classNames(
                                            mobileNavItemClass,
                                            themeColors["blue"].mobileMenu.item["normal"]
                                        )}
                                    >
                                        APPLY NOW
                                    </Link>
                                </Fragment>
                            </div>
                            <div
                                className={classNames(
                                    "py-4 px-5 flex space-x-3",
                                    themeColors["blue"].mobileMenu.iconsBg
                                )}
                            >
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
};

export default function Header() {
    const Component = useOnce("Header") ? motion.div : "div";
    const router = useRouter();
    const { asPath } = router;
    const lastSegment = asPath.split('/').pop();
    const [backgroundColor, setBackgroundColor] = React.useState<string>("");
    const [current, setCurrent] = React.useState<string | undefined>(lastSegment);
    React.useEffect(() => {
        const scrollListener = () => {
            const yPos = window.scrollY;
            setBackgroundColor(yPos > 0 ? "bg-gradient-to-b from-[#222222cc] to-[#333333aa] shadow-card-upload-black" : "");
        };

        window.addEventListener("scroll", scrollListener);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener("scroll", scrollListener);
        };
    }, []);
    return (
        <div className={`flex flex-col fixed w-full z-50 ${current == '' ? '' : 'bg-gradient-to-b from-[#222222cc] to-[#33333377]'} ${backgroundColor}`}>
            <div className="flex w-full justify-center items-center px-2  py-6  pt-8 z-[100]">
                <div className='w-full flex justify-between xl:max-w-[1200px] lg:max-w-[980px] md:max-w-[800px] px-12 md:px-0'>
                <Link
                    href="/"
                    className="flex shrink-0 overflow-visible"
                >
                    <Logo />
                </Link>
                <div className="w-full flex justify-end items-center md:justify-center ml-auto whitespace-nowrap">
                    <DesktopMenu />
                    <MobileMenu />
                </div>
                <button className={` hidden md:block bg-white text-[#444] uppercase text-base font-semibold font-header transition-colors cursor-pointer px-6 py-3  whitespace-nowrap rounded-full hover:scale-105 duration-1000 `}>
                    apply now
                </button>
                </div>
            </div>

        </div>
    )
}

