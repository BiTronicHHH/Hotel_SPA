import React from 'react'
import ApartmentContent from './ApartmentContent'
import { FaSmileBeam } from 'react-icons/fa'

export default function Story() {
    return (
        <div className='flex flex-col items-center my-32 py-20 bg-[#3179cc0f] xl:max-w-[1000px] lg:max-w-[800px] md:max-w-[600px]'>
            <h1 className='text-4xl font-semibold text-[#0e102c]'>Welcome to StateLine StayOvers</h1>
            <div className='flex justify-center lg:gap-20 px-10 pt-16'>
                <div className='max-w-[40%] min-w-[40%]'>
                    <ApartmentContent />
                </div>
                <div className='max-w-[40%] min-w-[40%] flex flex-col mx-6 my-6'>
                    <img src={`/slide3.jpg`} alt='' className=' shadow-card-upload duration-300 p-1 w-full aspect-[3/4] object-cover object-center rounded-xl' />
                    <h2 className="flex items-center mt-8">Texarkana Travel Accommodation: Explore and Unwind</h2>
                    <p>
                        Adventure awaits in Texarkana, and StateLine Stayovers is here to be your home base. Discover local landmarks, indulge in culinary delights, and soak in the rich history of the region. After a day of exploration, return to the comfort and luxury of our Texarkana accommodation.
                    </p>
                    <h2 className="flex items-center">Flexible Weekly and Monthly Stays in Texarkana</h2>
                    <p>
                        At StateLine Stayovers, we understand that every traveler's needs are unique, and we’ve tailored our accommodation options to suit. Whether you're planning a week-long business trip, a month-long relocation, or anything in between, our weekly and monthly stay packages offer unparalleled flexibility and convenience. Enjoy substantial savings, a range of amenities, and the comfort of our fully furnished suites for the duration of your visit. With our extended stay options, you can immerse yourself in the Texarkana lifestyle, experiencing the city like a local while enjoying all the benefits of a top-tier hotel. Discover a new way to stay with StateLine Stayovers, where long-term lodging meets luxury and convenience.
                    </p>
                    <h2 className="flex items-center">Discover the Difference at StateLine Stayovers</h2>
                    <p>
                        Ready to book your stay? Explore our suites, discover our amenities, and see why StateLine Stayovers is the premier choice for Texarkana accommodation. Experience the ease of an extended stay hotel with the charm and comfort of a boutique lodging option. Welcome to StateLine Stayovers – where luxury meets convenience at the state line.
                    </p>
                </div>
            </div>
        </div>
    )
}
