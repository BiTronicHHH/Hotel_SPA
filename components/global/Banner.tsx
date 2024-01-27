import React from "react";
import Image from "next/image";
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Slide from 'react-reveal/Slide';

const Banner = () => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 767, min: 464 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    const compArray = [
        '/slide1.jpg',
        '/slide2.jpg',
        '/slide3.jpg',
        '/slide4.jpg',
        '/slide5.jpg',
        '/slide6.jpg',
        '/slide7.jpg'
    ]
    return (
        <section id="project-banner">
            <div className="relative flex flex-col w-full shadow-card-upload-black h-[100vh] lg:pb-0 lg:h-[calc(100vh-10px)]">
                <div className="absolute min-h-full z-10 inset-0">
                    <Carousel
                        responsive={responsive}
                        swipeable={true}
                        draggable={false}
                        showDots={false}
                        infinite={true}
                        partialVisible={false}
                        autoPlay
                        autoPlaySpeed={5000}
                        transitionDuration={500}
                        dotListClass="custom-dot-list-style"
                        arrows={false}
                        className="h-full"
                    >
                        {/* Add your carousel slides here */}
                        {compArray.map((comp, index) => (
                            <div className="w-full h-full relative">
                                <img src={comp} key={index} alt="banner" className=" w-full h-full object-cover mix-blend-screen" />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div className="w-full flex items-center justify-center bg-[#33333354] h-full px-10  z-20 ">
                    <Slide bottom>
                        <div className="w-full xl:max-w-[1200px] xl:min-w-[1200px] lg:max-w-[1000px] lg:min-w-[1000px] md:max-w-[700px] md:min-w-[700px] max-w-[100vw] min-w-[400px] flex flex-col items-center justify-center  gap-3">

                            <h1 className=" xl:text-6xl lg:text-5xl md:text-4xl text-2xl md:mt-10 lg:mt-0  text-white font-semibold text-center">
                                Welcome to StateLine Stayovers: Your Ideal Extended Stay in Texarkana
                            </h1>
                            <h3 className="xl:text-3xl lg:text-2xl text-lg text-white text-justify my-4 pr-8 ">
                                Find your perfect home away from home at StateLine Stayovers, Texarkana’s premier extended stay hotel. <br />Strategically positioned on the vibrant state line connecting Texas and Arkansas, our establishment offers a unique blend of homely comfort and luxurious hotel living.
                                Whether you’re in town for work commitments, in the process of relocating, or simply on the lookout for an extended retreat, StateLine Stayovers is designed to accommodate your specific needs. <br />Our spacious, fully furnished suites, along with a myriad of thoughtful amenities and a dedicated service team, guarantee a stay filled with ease and comfort.
                            </h3>
                            <div className="w-full flex justify-center items-center gap-12">
                                <button className="px-12 py-4 mt-6 hover:scale-105 duration-500 xl:text-2xl lg:text-xl text-base uppercase bg-[#2b82c9a1] text-white rounded-full font-semibold">
                                    View Properties
                                </button>
                                <button className="px-12 py-4 mt-6 hover:scale-105 duration-500 xl:text-2xl lg:text-xl text-base uppercase bg-[#b94c2ea1] text-white rounded-full font-semibold">
                                    Apply Now !
                                </button>
                            </div>
                        </div>
                    </Slide>
                </div>
            </div>
        </section>
    );
};

export default Banner;

