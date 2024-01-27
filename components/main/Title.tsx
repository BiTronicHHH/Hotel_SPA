import React from 'react'
import Link from 'next/link'

export default function Title() {
    return (
        <div className='w-full relative shadow-card-upload-black'>
            <img className='absolute top-0 left-0 h-full w-full' src='/bg4.jpg' />
            <div className='z-10 pt-20 pb-16 relative flex w-full flex-col items-center text-[white]'>
                <div className='text-2xl mb-2 md:text-4xl lg:text-6xl font-semibold'>AI Resources Marketplace</div>
                <div className='text-xl mb-3 md:text-2xl lg:text-4xl font-semibold text-[transparent] bg-clip-text bg-gradient-to-r from-[#3072ff] to-[#f494fd]'>Your Gateway to AI Excellence</div>
                <div className='px-4 text-lg md:text-xl font-semibold text-justify w-full md:w-[600px] lg:w-[850px]'>Discover the AI Resources Marketplace: the practical solution to harnessing AI prompts. Delve into our vast collection of MidJourney prompts, meticulously designed to fuel your creativity and expedite your AI projects. Save precious time you&apos;d spend searching and benefit from cost-effective access to premium AI resources. Our informative blogs keep you updated, while the marketplace offers the latest AI innovations. Engage with the future through our ChatGPT prompts. Start your AI journey today, and unlock the smarter, cheaper, and faster way to AI mastery!</div>
                <Link href='' className='mt-6 relative text-[white] font-semibold text-lg px-7 py-4 bg-[#291ec7ec] rounded-md shadow-card-upload-black hover:bg-[#191ec7]'>
                    Subscribe Now
                </Link>
            </div>
        </div>
    )
}
