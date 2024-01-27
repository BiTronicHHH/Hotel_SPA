"use client"

import React from 'react'
import StripeComp from './StripeComp'
import { ImCross } from 'react-icons/im'
import Logo from '../global/Logo'
import stripeContext from '@/context/StripeContext'
import priceContext from '@/context/PriceContext'
import { useRouter } from 'next/router';

// const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

const StripeDialog = () => {
    const { openSt, setOpenSt } = React.useContext(stripeContext);
    const { price, setPrice } = React.useContext(priceContext);
    const router = useRouter();
    const handleClose = () => {
        setOpenSt(false);
        router.reload();
        setPrice(0);
    }
    return (
        <>
            {/* <div onClick={onOpen} className="flex justify-center items-center border rounded-tr-md rounded-bl-md rounded-tl-md border-[#023E89] bg-[#023E89] text-white px-1 py-[18px] cursor-pointer text-[24px] font-light leading-[30px] tracking-[0.96px] hover:bg-[#245C9A] duration-300">Get Started</div> */}
            <div className={`${openSt ? 'flex' : 'hidden'} items-center justify-center fixed w-screen h-screen bg-[#04131bc7] top-0 left-0 z-[101]`} >
                <div className='overflow-y-scroll  px-8 overflow-x-hidden flex flex-col items-center z-[11] bg-[#040a0f] py-12 rounded-3xl shadow-card-upload'>
                    <div>
                        <div className="w-full">
                            <div className="flex flex-row gap-1 justify-between">
                                <Logo />
                                <ImCross onClick={handleClose} size={'20px'} color='#023E89' className="hover:scale-125 duration-300 cursor-pointer" />
                            </div>
                            <div className='mt-4'>
                                <div className=" text-white font-bold w-full">
                                    <p className="text-2xl text-white text-center ">
                                        Thank <span className="text-[#4ee6fa]">You!</span>
                                    </p>
                                    <div>{price} USD</div>
                                    <StripeComp />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default StripeDialog;