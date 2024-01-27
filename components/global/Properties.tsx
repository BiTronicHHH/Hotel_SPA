import Image from 'next/image';
import React from 'react'
import { FaChair, FaCheckCircle, FaSwimmingPool } from 'react-icons/fa';
import LightSpeed from 'react-reveal/LightSpeed';
import Logo from './Logo';
import Link from 'next/link';

export default function PropertiesComp() {

    return (
        <div className='flex flex-col items-center justify-center xl:max-w-[1000px] lg:max-w-[800px] md:max-w-[600px] mt-44    mb-28 px-4'>
            <LightSpeed cascade>
                <div className='w-full flex items-center justify-center gap-8 min-h-[calc(100vh-810px)]'>
                    <div className='w-full items-center justify-center'>
                        <Link href='/properties/stateline-stayovers' className='flex items-center justify-center p-1 rounded-3xl bg-card-bg scale-125 mx-10 border-2 border-[#3b44a7] shadow-card-upload-black'><Logo /></Link>
                    </div>
                    <div className='w-full items-center justify-center'>
                        <Link href='/properties/texarkana-towne' className='flex items-center justify-center p-1 rounded-3xl bg-card-bg scale-125 mx-10 border-2 border-[#3b44a7] shadow-card-upload-black'><Logo /></Link>
                    </div>
                </div>
            </LightSpeed>
        </div>
    )
}
