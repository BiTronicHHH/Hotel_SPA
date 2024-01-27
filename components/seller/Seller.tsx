import React from 'react'
import Image from 'next/image';
import { FaEye, FaCoins, FaThumbsUp } from 'react-icons/fa';
const newPrompts = [
    '/projects/1.jpg',
    '/projects/2.png',
    '/projects/3.png',
    '/projects/4.png',
];
const bestSelling = [
    '/projects/2.png',
    '/projects/3.png',
    '/projects/4.png',
    '/projects/5.png',
    '/projects/3.png',
    '/projects/4.png',
    '/projects/5.png',
    '/projects/8.png',
];
const featuredPrompts = [
    '/projects/2.png',
    '/projects/3.png',
    '/projects/4.png',
    '/projects/5.png',
    '/projects/3.png',
    '/projects/4.png',
]
const restPrompts = [
    '/projects/3.png',
    '/projects/4.png',
    '/projects/5.png',
    '/projects/8.png',
]
const Seller = () => {
    return (
        <div className="lg:pt-[144px] px-4 md:px-16 lg:px-40 py-20 shadow-card-upload-black relative text-white before:absolute before:content-[' '] before:top-0 before:left-0 before:bottom-0 before:right-0 before:bg-[url(/gradient/5.jpg)] before:opacity-20 before:bg-cover bg-black">
            <div className='relative shadow-card-upload-black rounded-2xl'>
                <div className="lg:aspect-[10/2] md:aspect-[4/1] aspect-[8/3] w-full before:absolute before:content-[' '] before:top-0 before:left-0 before:bottom-0 before:right-0 before:bg-[url(/gradient/1.jpg)] before:border-4 before:rounded-2xl before:border-white before:bg-cover before:bg-center px-40 text-3xl text-white bg-black before:opacity-95 rounded-2xl" >
                </div>
                <div className='absolute bottom-[-100px] left-8 flex flex-col items-center w-[150px]'>
                    <div>
                        <Image src="/avatar.png" alt='avatar' className='rounded-full aspect-square shadow-card-upload-black  border-[4px] outline-double outline-8 outline-white border-[#000000af] object-cover object-center' width={150} height={150} layout='fixed' objectFit="cover" objectPosition="center center" />
                    </div>
                    <div className='mt-2 font-semibold text-3xl whitespace-nowrap'><span className='text-[transparent] bg-clip-text bg-gradient-to-r from-[#01dcff] to-cus-pink'>Albert Engafsdaf</span></div>
                </div>
            </div>
            <div className='my-2 text-white mt-[120px] text-justify font-semibold'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam imperdiet sed lectus ut congue. Suspendisse enim nisi, dapibus at malesuada sed, aliquam et lectus. Morbi auctor venenatis mauris. Praesent id lacus at nunc accumsan commodo. Aliquam et velit purus. Duis sit amet ipsum eu felis efficitur condimentum. Curabitur ultricies at turpis ac accumsan. Donec arcu nunc, tincidunt in porttitor vel, laoreet ut augue. Praesent molestie fermentum mauris, quis eleifend purus dictum ac. Quisque at justo eu ligula iaculis accumsan. Donec lorem nisl, lobortis eu hendrerit ut, fermentum id felis. Etiam lacinia tincidunt semper.
            </div>
            <div className='flex items-center font-semibold mb-16'>
                <div className='flex items-center gap-2 cursor-pointer text-cus-pink mr-6'>
                    <FaEye className='' />
                    <div className=''>7.5K</div>
                </div>
                <div className='mr-6 flex items-center gap-2 cursor-pointer text-cus-yellow'>
                    <FaCoins className=' text-glow' />
                    <span className=' font-semibold'>8K</span>
                </div>
                <div className='mr-8 flex items-center gap-2 cursor-pointer text-custom-sky'>
                    <FaThumbsUp className='' />
                    <span className=' font-semibold'>11K</span>
                </div>
                <div className='flex items-center gap-2 cursor-pointer text-card-bg'>
                    <div className='text-sm'>Joined:</div>
                    <span className=' font-semibold'>Feb 26, 2023</span>
                </div>
            </div>
            <div className='my-8 border-t-2 py-2'>
                <div className=' lg:text-3xl md:text-2xl text-xl my-4 font-semibold '>
                    <span className='text-[transparent] bg-clip-text text-white'>Best Selling Prompts</span>
                </div>
                <div className='grid md:grid-cols-6 grid-cols-4 lg:gap-2 md:gap-4 gap-6 py-4 px-4 rounded-2xl shadow-card-upload border-4 border-white'>
                    {bestSelling.map((img, index) => (
                        <div className='w-full aspect-[2/3] outline-2 p-1 rounded-lg shadow-card-upload relative cursor-pointer border-2 border-white' key={index}>
                            <img src={img} className='w-full h-full rounded-lg object-cover object-center' alt='ddd'/>
                        </div>
                    ))}
                </div>
            </div>
            <div className='my-8 border-t-2 py-2'>
                <div className=' lg:text-3xl md:text-2xl text-xl my-4 font-semibold '>
                    <span className='text-[transparent] bg-clip-text text-white'>New Prompts</span>
                </div>
                <div className='grid lg:grid-cols-8 md:grid-cols-6 grid-cols-4 lg:gap-2 md:gap-4 gap-6 py-4 px-4 rounded-2xl shadow-card-upload border-4 border-white'>
                    {newPrompts.map((img, index) => (
                        <div className='w-full aspect-[2/3] outline-2 p-1 rounded-lg shadow-card-upload relative cursor-pointer border-2 border-white' key={index}>
                            <img src={img} className='w-full h-full rounded-lg object-cover object-center' alt='ddd'/>
                        </div>
                    ))}
                </div>
            </div>
            <div className='my-8 border-t-2 py-2'>
                <div className=' lg:text-3xl md:text-2xl text-xl my-4 font-semibold '>
                    <span className='text-[transparent] bg-clip-text text-white'>Featured Prompts</span>
                </div>
                <div className='grid md:grid-cols-6 grid-cols-4 lg:gap-2 md:gap-4 gap-6 py-4 px-4 rounded-2xl shadow-card-upload border-4 border-white'>
                    {featuredPrompts.map((img, index) => (
                        <div className='w-full aspect-[2/3] outline-2 p-1 rounded-lg shadow-card-upload relative cursor-pointer border-2 border-white' key={index}>
                            <img src={img} className='w-full h-full rounded-lg object-cover object-center' alt='ddd'/>
                        </div>
                    ))}
                </div>
            </div>
            <div className='my-8 border-t-2 py-2'>
                <div className=' lg:text-3xl md:text-2xl text-xl my-4 font-semibold '>
                    <span className='text-[transparent] bg-clip-text text-white'>All Prompts</span>
                </div>
                <div className='grid md:grid-cols-6 grid-cols-4 lg:gap-2 md:gap-4 gap-6 py-4 px-4 rounded-2xl shadow-card-upload border-4 border-white'>
                    {restPrompts.map((img, index) => (
                        <div className='w-full aspect-[2/3] outline-2 p-1 rounded-lg shadow-card-upload relative cursor-pointer border-2 border-white' key={index}>
                            <img src={img} className='w-full h-full rounded-lg object-cover object-center' alt='ddd'/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Seller;
