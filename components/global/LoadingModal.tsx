import React from 'react';
import Logo from './Logo';

interface Props {
    message?: string;
}
const LoadingModal: React.FC<Props> = ({ message }) => {
    return (
        <div className="z-[999999] w-screen md:w-full flex h-full min-h-screen top-0 left-0 bg-black/40 fixed">
            <div className='w-full h-screen bg-cover flex justify-center items-center '>

                <div className='relative top-0 left-0 mx-auto w-44 h-44  flex flex-col items-center justify-center'>
                    <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#193646ec] to-[#47053ccb] rotate-45 rounded-2xl '>
                    </div>
                    <Logo rotateClassName='mt-6'/>
                    <div
                        className={`inline-block h-10 w-10 animate-spin text-pinkLight rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${message ? "mt-4 ml-20" : "mt-4"}`}
                        role="status">
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingModal; 
