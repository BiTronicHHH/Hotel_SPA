import Link from 'next/link'
import React from 'react'
import Logo from '../global/Logo'
import Image from 'next/image'

export default function TT() {
    const compArray = [
        '/ss1.jpg',
        '/ss2.jpg',
        '/ss3.png',
        '/ss4.png',
    ]
    return (
        <div className='flex relative flex-col justify-center items-center mt-40 mb-20'>
            <div className='w-full flex flex-col justify-center items-center gap-10 lg:gap-0 lg:flex-row lg:justify-between lg:items-center px-8 xl:max-w-[1200px] xl:min-w-[1200px] lg:max-w-[1000px] lg:min-w-[1000px] md:max-w-[700px] md:min-w-[700px] max-w-[100vw] min-w-[400px]' >
                <div className='flex items-center justify-center p-1 rounded-3xl bg-card-bg scale-125 mx-10 border-2 border-[#3b44a7] shadow-card-upload-black'>
                    <Logo />
                </div>
                <div className=' flex flex-col justify-start items-center lg:items-start  p-4'>
                    <div className='text-xl uppercase mb-2'>Property Type</div>
                    <div className='text-base text-[#444] mb-6 '>
                        Apartments
                    </div>
                    <div className='text-xl uppercase mb-2'>Property Location</div>
                    <div className='text-base text-[#444]  mb-6 '>
                        200 Realtor Ave<br />
                        <span className='underline'>Texarkana, AR</span> 71854
                    </div>
                    <div className='text-xl uppercase mb-2'>Property Details</div>
                    <ul className='text-base text-[#444]  mb-6 list-disc list-inside '>
                        <li>Will Get Room Type Counts</li>
                        <li>Pets Allowed</li>
                        <li>Balcony</li>
                    </ul>
                </div>
                <div className=' flex flex-col justify-start items-center lg:items-start  p-4'>
                    <div className='text-xl uppercase mb-2'>Pricing</div>
                    <div className='text-base text-[#444] mb-6 '>
                        Furnished starting at $1000/mo<br />
                        Unfurnished starting at $700/mo
                    </div>
                    <div className='text-xl uppercase mb-2'>Contact</div>
                    <div className='text-base text-[#444]  mb-6 '>
                        Office: <span className='underline'>(870) 774-3151</span><br />
                        Mobile: <span className='underline'>(870) 774-3151</span><br />
                        Email: <span className='underline'>manager@slstay.com</span>
                    </div>
                    <Link type="submit" href="/apply-now" className=' cursor-pointer rounded-full px-8 py-2 bg-[#3bb7ff] border-2 border-[#4d94f1] text-white duration-300 hover:scale-105 text-xl font-semibold mt-8' >Apply Now</Link>
                </div>
            </div>
            <div className='w-full flex flex-col justify-center items-center gap-10 lg:gap-0 lg:flex-row lg:justify-between lg:items-center px-8 xl:max-w-[1200px] xl:min-w-[1200px] lg:max-w-[1000px] lg:min-w-[1000px] md:max-w-[700px] md:min-w-[700px] max-w-[100vw] min-w-[400px] my-16 py-16 bg-[#3179cc0f]'>
                <div className='min-w-[48%] aspect-[4/3] relative shadow-card-upload'>
                    <iframe
                        className=" top-0 left-0"
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "0",
                        }}
                        src={`https://maps.google.com/maps?q=${33.468744919382054},${-94.04176530614926}&z=15&output=embed`}
                        allowFullScreen
                    ></iframe>
                </div>
                <div className='min-w-[48%] aspect-[4/3] relative shadow-card-upload'>
                    <Image src='/tt_port.png' alt='fox' layout="fill"
                        objectFit="cover"
                        objectPosition="center" />
                </div>
            </div>
            <div className='w-full flex flex-col justify-center items-center px-8 xl:max-w-[1200px] xl:min-w-[1200px] lg:max-w-[1000px] lg:min-w-[1000px] md:max-w-[700px] md:min-w-[700px] max-w-[100vw] min-w-[400px] my-16 py-12 '>
                <div className='text-3xl font-semibold'>Texarkana Towne Apartments Gallery | Coming Soon</div>
                <div className='grid grid-cols-4 mt-10 gap-2'>
                    {compArray.map((comp, index) => (
                        // <div className='w-full aspect-[4/3] relative shadow-card-upload'>
                        //     <Image src={comp} key={index} alt='fox' layout="fill"
                        //         objectFit="cover"
                        //         objectPosition="center" />
                        // </div>
                        <div className="aspect-[4/3] relative rounded-xl shadow-card-upload-black p-1">
                            <img src={comp} key={index} alt="banner" className=" w-full h-full object-cover rounded-xl " />
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}
