import React from 'react'
import { FaTimesCircle } from 'react-icons/fa';

export default function OurTeam() {
    const [current, setCurrent] = React.useState(false);
    const handleClickAbout = () => {
        setCurrent(true);
    }
    return (
        <div className='flex flex-col items-center my-20 py-20 pb-32 bg-[#3179cc0f] xl:max-w-[1000px] lg:max-w-[800px] md:max-w-[600px]'>
            <h1 className='text-4xl font-semibold text-[#0e102c]'>Our Team</h1>
            <div className='grid grid-cols-3 justify-center gap-6 px-8 pt-16'>
                <div className='max-w-full min-w-full relative '>
                    <div className='w-full overflow-hidden rounded-xl'>
                        <img src={`/1.png`} alt='' className=' hover:scale-105 shadow-card-upload duration-300 w-full aspect-[3/4] object-cover object-center rounded-xl' />
                    </div>
                    <div className='absolute w-full flex items-center py-5 justify-center bg-gradient-to-b from-[#097bbd] to-[#0344797c] rounded-b-xl cursor-pointer bottom-0 ' onClick={() => handleClickAbout()}>
                        <p className='text-white text-3xl text-glow mt-2 font-semibold font-body' >Elon Musk</p>
                    </div>
                </div>
                <div className='max-w-full min-w-full relative '>
                    <div className='w-full overflow-hidden rounded-xl'>
                        <img src={`/2.jpg`} alt='' className=' hover:scale-105 shadow-card-upload duration-300  w-full aspect-[3/4] object-cover object-center rounded-xl' />
                    </div>
                    <div className='absolute w-full flex items-center py-5 justify-center bg-gradient-to-b from-[#097bbd] to-[#0344797c] rounded-b-xl cursor-pointer bottom-0 ' onClick={() => handleClickAbout()}>
                        <p className='text-white text-3xl text-glow mt-2 font-semibold font-body' >Bill Gates</p>
                    </div>
                </div>
                <div className='max-w-full min-w-full relative '>
                    <div className='w-full overflow-hidden rounded-xl'>
                        <img src={`/3.jpg`} alt='' className=' hover:scale-105 shadow-card-upload duration-300  w-full aspect-[3/4] object-cover object-center rounded-xl' />
                    </div>
                    <div className='absolute w-full flex items-center py-5 justify-center bg-gradient-to-b from-[#097bbd] to-[#0344797c] rounded-b-xl cursor-pointer bottom-0 ' onClick={() => handleClickAbout()}>
                        <p className='text-white text-3xl text-glow mt-2 font-semibold font-body' >Jack Ma</p>
                    </div>
                </div>
                <div className={`${current ? 'flex' : 'hidden'} flex-col items-center justify-center fixed w-screen h-screen bg-[#04131bc7] text-white top-0 left-0 z-50 `} >
                    <div className=' w-[70%] relative overflow-y-scroll aspect-video flex flex-col items-center justify-center shadow-card-upload-black z-[9999] top-10 bg-[white] py-20 px-20 rounded-3xl'>
                        <div className='absolute right-4 top-8  cursor-pointer ' onClick={() => { setCurrent(false) }}>
                            <FaTimesCircle className='text-[#999] hover:text-black  hover:scale-105 text-3xl' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
