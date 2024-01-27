import React from 'react'
import Slider from '../slide/Slider'
import Title from './Title'
import TitleSecond from './TitleSecond'
import Link from 'next/link'

export default function MainPage () {

    return (
        <div className='w-full items-center bg-[white] flex flex-col gap-16 py-8 lg:pt-[74px]'>
            <Title />
        </div>
    )
}
