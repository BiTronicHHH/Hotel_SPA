import React from 'react'
import { FaAngleUp, FaAngleRight } from 'react-icons/fa'

interface Props {
    title: string;
    description: React.ReactNode;
}
const TermsComp: React.FC<Props> = ({ title, description }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <div className='my-6 flex flex-col items-center w-full relative'>
            <div className='font-header tracking-wider cursor-pointer flex shadow-card-upload-black md:w-[605px] w-[calc(100vw-50px)] text-2xl font-semibold items-center justify-between bg-gradient-to-t from-[#000000cb] to-[#1f99be41] py-2 text-[white] px-8 rounded-lg z-30' onClick={() => setOpen(!open)}>
                {title}
                {open ? <FaAngleUp /> : <FaAngleRight />}
            </div>
            <div className={` font-body text-[white] bg-gradient-to-t from-[#101a30aa] to-[#04283155] px-8 md:w-[600px] shadow-card-upload-black relative top-[-2px]  w-[calc(100vw-55px)] md:py-8 py-4  ${open ? 'flex' : 'hidden'}`}>
                {description}
            </div>
        </div>
    )
}

export default TermsComp;