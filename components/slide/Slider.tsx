import React from 'react'
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SliderComp from './SliderComp';

interface Props {
    category?: string;
    imageUrl: string[];
    description: string;
    sales: number;
    thumb: number;
}

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 5 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 767, min: 464 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    }
};


const Slider: React.FC<{ compArray: Props[] }> = ({ compArray }) => {
    
    return (
        <div className='relative ml-4 md:ml-32'>

            <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                showDots={true}
                infinite={true}
                partialVisible={false}
                dotListClass="custom-dot-list-style"
            >
                {/* Add your carousel slides here */}
                {compArray.map((comp, index) => (
                    <SliderComp key={index} category={comp.category} imageUrl={comp.imageUrl} description={comp.description} sales={comp.sales} thumb={comp.thumb} />
                ))}
            </Carousel>
        </div>
    )
}


export default Slider;