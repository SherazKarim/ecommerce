import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { CiShoppingBasket } from "react-icons/ci";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AOS from 'aos'

import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import Wrapper from '../wrapper/Wrapper';

export const Carousel2 = () => {
    const [transform, setTransform] = useState({ x: 0, y: 0 });

    return (
        <>
            <Swiper
                effect={'fade'}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination]}
                className=" w-full  my-10"
            >
                <div>
                    <SwiperSlide>
                        <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-x-12 gap-y-16 py-28 bg-cover bg-[url('https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-108775.jpg?size=626&ext=jpg&ga=GA1.1.901680783.1706168011&semt=ais')]">
                            <div className='relative lg:w-[50%] flex justify-end'>
                                <div className='flex absolute left-[50%] z-10 justify-center polygon' data-aos="fade-down" data-aos-duration="2000">
                                    <div className='bg-red-700 rounded-[100%] w-24 h-24 flex flex-col items-center justify-center animate-spin-slow origin-center'>
                                        <h1 className='text-white font-extrabold z-30 text-[1.3rem]'>57%</h1>
                                        <span className='text-white'>Offer</span>
                                    </div>
                                </div>
                                <div className="" data-aos="fade-right" data-aos-duration="2000" >
                                    <img
                                        id="image"
                                        className="w-[550px] transition-all duration-300 ease-in-out"
                                        src="https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2021/06/red_shoe-min-1-1.png"
                                        alt="Your Image"
                                        style={{
                                            transform: `translate(${transform.x}px, ${transform.y}px)`,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className=' flex flex-col justify-center lg:items-start items-center pe-1 lg:w-[50%]' data-aos="fade-left" data-aos-duration="2000" >
                                <h1 className='text-white lg:text-start font-bold text-4xl text-center'>Join now & earn 5% rewards on every order</h1>
                                <div className='font-semibold text-sm text-start py-9'>
                                    <span className='text-lg text-white pe-3'>$340.00</span>
                                    <span className='text-gray-400 line-through'>$460.00</span>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='gap-1 justify-center items-center flex-row bg-red-600 hover:bg-red-500 text-white flex font-semibold w-fit text-sm px-7 py-4 mt-5'>
                                    <CiShoppingBasket size={"15px"}/>
                                    <button
                                        className=''>Buy Now</button>
                                    </div>
                                    <button
                                        className='bg-black hover:bg-transparent flex justify-center items-center text-white border border-solid-grey-500 font-semibold w-fit text-sm px-6 py-3 mt-5'>View Collection</button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-x-12 gap-y-16 py-28 bg bg-cover bg-[url('https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-108775.jpg?size=626&ext=jpg&ga=GA1.1.901680783.1706168011&semt=ais')]">
                            <div className='relative lg:w-[50%] flex justify-end'>
                                <div className='flex absolute left-[50%] z-10 justify-center' data-aos="fade-down" data-aos-duration="2000">
                                    <div className='bg-blue-600 rounded-[100%] w-24 h-24 flex flex-col items-center justify-center animate-spin-slow origin-center'>
                                        <h1 className='text-white font-extrabold z-30 text-[1.3rem]'>57%</h1>
                                        <span className='text-white'>Offer</span>
                                    </div>
                                </div>
                                <div className="" data-aos="fade-right" data-aos-duration="2000" >
                                    <img
                                        id="image"
                                        className="w-[550px] z-50 transition-all duration-300 ease-in-out"
                                        src="https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/revslider/shoes/blue_shoe-min.png"
                                        alt="Your Image"
                                        style={{
                                            transform: `translate(${transform.x}px, ${transform.y}px)`,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className=' flex flex-col justify-center  lg:items-start items-center pe-1 lg:w-[50%]' data-aos="fade-left" data-aos-duration="2000" >
                                <h1 className='text-white lg:text-start text-center font-bold text-4xl'>Join now & earn 5% rewards on every order</h1>
                                <div className='font-semibold text-sm text-start py-9'>
                                    <span className='text-lg text-white pe-3'>$340.00</span>
                                    <span className='text-gray-400 line-through'>$460.00</span>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='gap-1 justify-center items-center flex-row bg-blue-600 hover:bg-blue-500 text-white flex font-semibold w-fit text-sm px-7 py-4 mt-5'>
                                    <CiShoppingBasket size={"15px"}/>
                                    <button
                                        className=''>Buy Now</button>
                                    </div>
                                    <button
                                        className='bg-black hover:bg-transparent flex justify-center items-center text-white border border-solid-grey-500 font-semibold w-fit text-sm px-6 py-3 mt-5'>View Collection</button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </div>
            </Swiper>
        </>
    );
}
