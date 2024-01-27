import Image from 'next/image';
import React from 'react'
import { FaChair, FaCheckCircle, FaSwimmingPool } from 'react-icons/fa';
import Bounce from 'react-reveal/Bounce';

export default function NavTab() {
    const [current, setCurrent] = React.useState(1);
    const standardContent = [
        'Fully Furnished Apartments',
        'Low-Income Apartments',
        'No Credit Check Apartments',
        'Immediate Move-In Apartments',
        'Secure Apartment Living',
        'Utilities Included',
        'One pet allowed (< 40 lbs)'
    ];
    const interContent = [
        'Quartz countertops',
        'New kitchen appliances',
        'LVP flooring',
        'Top quality wall finishes',
        'New electrical & plumbing',
        'High-efficiency HVAC wall units',
        'High-speed Internet'
    ];
    const exterContent = [
        'Durable, steel roofing',
        'Beautifully maintained landscaping',
        'Newly paved entry and lot',
        'New electrical & plumbing',
        'Ample outdoor parking',
        '16+ security cameras on each property',
    ];
    return (
        <div className='flex flex-col items-center justify-center xl:max-w-[1000px] lg:max-w-[800px] md:max-w-[600px] mt-44    mb-28 px-4'>
            <Bounce top>
                <div className='flex justify-between w-full mt-6 cursor-pointer text-lg'>
                    <div className={`flex justify-center items-center w-full py-6 uppercase font-semibold duration-300 ${current == 0 ? 'border-t-2 border-[#368bbd] bg-[#3179cc0f]' : ''}`} onClick={() => setCurrent(0)}>Standard Features</div>
                    <div className={`flex justify-center items-center w-full py-6 uppercase font-semibold duration-300 ${current == 1 ? 'border-t-2 border-[#368bbd] bg-[#3179cc0f]' : ''}`} onClick={() => setCurrent(1)}><FaChair className='text-[#368bbd] mr-3 text-2xl' />Interior</div>
                    <div className={`flex justify-center items-center w-full py-6 uppercase font-semibold duration-300 ${current == 2 ? 'border-t-2 border-[#368bbd] bg-[#3179cc0f]' : ''}`} onClick={() => setCurrent(2)}><FaSwimmingPool className='text-[#368bbd] text-3xl mr-3' />Exterior</div>
                </div>
                <div className='w-full flex justify-between xl:px-36 lg:px-24 md:px-12 px-4 bg-[#3179cc07] py-12  border-t border-t-white'>
                    <div className='max-w-[43%] aspect-[3/4] mx-6 shadow-card-upload rounded-2xl'>
                        <img src={`${current == 0 ? '/slide1.jpg' : current == 1 ? '/slide2.jpg' : '/slide3.jpg'}`} alt='' className=' rounded-2xl duration-300 p-1 w-full h-full object-cover object-center' />
                    </div>
                    <div className='max-w-[40%] w-full flex flex-col justify-start'>
                        {current == 0 && (
                            standardContent.map((content, index) => (
                                <div className='flex items-center text-lg font-semibold whitespace-nowrap  my-3' key={index}>
                                    <div className='mr-4'>
                                        <FaCheckCircle className='text-xl text-[#4bb6e7]' />
                                    </div>
                                    <div>{content}</div>
                                </div>
                            ))
                        )}
                        {current == 1 && (
                            interContent.map((content, index) => (
                                <div className='flex items-center text-lg font-semibold whitespace-nowrap  my-3' key={index}>
                                    <div className='mr-4'>
                                        <FaCheckCircle className='text-xl text-[#4bb6e7]' />
                                    </div>
                                    <div>{content}</div>
                                </div>
                            ))
                        )}
                        {current == 2 && (
                            exterContent.map((content, index) => (
                                <div className='flex items-center text-lg font-semibold whitespace-nowrap  my-3' key={index}>
                                    <div className='mr-4'>
                                        <FaCheckCircle className='text-xl text-[#4bb6e7]' />
                                    </div>
                                    <div>{content}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </Bounce>
        </div>
    )
}
