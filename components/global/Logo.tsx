import React from 'react'

interface Props {
    clasLog?: boolean;
    rotateClassName?: string;
}
const Logo:React.FC<Props> = ({clasLog, rotateClassName}) => {
    return (
        <div className={`${rotateClassName} z-10 mx-4 flex items-center font-Urbansit overflow-visible ${clasLog ? 'flex-row' : 'flex-col md:flex-row'}`}>
            <div className={`${clasLog ? 'text-6xl mr-1' : ' mr-0 md:mr-1 md:text-6xl text-6xl ' }  text-white`}>SL</div>
            <div className=' text-white mb-1'>
                <div className='flex flex-col justify-center'>
                    <div className={`${clasLog ? 'text-xl' : ' md:text-xl text-xs ' } leading-tighter`}>StateLine</div>
                    <div className={`${clasLog ? 'text-[19px]' : ' md:text-[19px] text-[11px] ' }  leading-none`}>StayOvers</div>
                </div>
            </div>
        </div>
    )
}
{/* <div className={`${clasLog ? 'text-6xl mr-1' : ' mr-0 md:mr-1 md:text-6xl text-6xl ' }  text-[transparent] bg-clip-text bg-gradient-to-r from-[#01dcff] to-[#fe01d4]`}>AI</div>
<div className=' text-[transparent] bg-clip-text bg-gradient-to-r from-[#01dcff] to-[#fe01d4]'> */}
export default Logo;