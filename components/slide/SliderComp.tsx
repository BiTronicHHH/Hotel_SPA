import React from 'react'
import { FaCoins, FaThumbsUp } from 'react-icons/fa';
import Image from 'next/image';
interface Props {
    category?: string;
    imageUrl: string[];
    description: string;
    sales: number;
    thumb: number;
    key: number
}

const SliderComp: React.FC<Props> = ({ category, imageUrl, description, sales, thumb, key }) => {
    return (
        <div className='slider relative mx-8 mt-4 rounded-lg shadow-card-upload-black' key={key}>
            <div className='w-full'>
                <div className='w-full flex'>
                    <img src={imageUrl[0]} className=' rounded-tl-lg w-[50%] aspect-square object-cover object-center' alt='wrongUrl' />
                    <img src={imageUrl[1]} className=' rounded-tr-lg w-[50%] aspect-square object-cover object-center' alt='wrongUrl' />
                </div>
                <div className='w-full flex'>
                    <img src={imageUrl[2]} className=' rounded-bl-lg w-[50%] aspect-square object-cover object-center' alt="wrongUrl" />
                    <img src={imageUrl[3]} className=' rounded-br-lg w-[50%] aspect-square object-cover object-center' alt='wrongUrl' />
                </div>
            </div>
            <div className='absolute bottom-0 left-0 w-full bg-[#ffffffcc] justify-between truncate text-[black] rounded-b-lg px-3 py-2 font-semibold flex'>
                <div className='text-[transparent] bg-clip-text bg-gradient-to-r to-[#3072ff] from-[#191ec7] w-32 truncate'>{description}</div>
                <div className='xl:flex hidden'>
                    <div className='flex mr-4'>
                        <FaCoins className='mr-2' />
                        <div>{sales}</div>
                    </div>
                    <div className='flex'>
                        <FaThumbsUp className='mr-2'/>
                        <div>{thumb}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderComp;