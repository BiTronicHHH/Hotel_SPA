import React from 'react'
import Banner from '../global/Banner'
import NavTab from '../global/NavTab'

export default function HomeComp() {
  return (
    <div className='flex flex-col relative w-full'>
      <Banner />

        <div className='w-full flex flex-col items-center'>
          <NavTab />
        </div>
    </div>
  )
}
