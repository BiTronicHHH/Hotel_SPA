import React from 'react'
import Link from 'next/link'

export default function TitleSecond() {
    return (
        <div className='w-full relative shadow-card-upload-black'>
            <img className='absolute top-0 left-0 h-full w-full' src='/bg3.jpg' />
            <div className='z-20 pt-28 pb-24 relative flex w-full flex-col items-center text-[white]'>
                <div className='mb-6 mt-4 text-2xl  md:text-4xl lg:text-5xl font-semibold'>Unleash Your AI Expertise on the Market!</div>
                <div className='px-4 text-lg md:text-xl font-semibold text-justify w-full md:w-[600px] lg:w-[850px]'>Are you adept at harnessing the power of AI? Don&apos;t just keep that skill to yourself. Convert your knowledge into revenue by selling your unique prompts on the AI Resources Marketplace. Dive into a community eager for quality AI content and earn while you innovate.&nbsp;<span>Sell your prompts now</span>&nbsp;and embark on a profitable journey with us!</div>
                <Link href='' className='mt-6 relative text-[white] font-semibold px-7 py-3 hover:bg-[#c877d3ec] rounded-md shadow-card-upload-black bg-[#e989f1]'>
                    Sell Prompt
                </Link>
            </div>
        </div>
    )
}
