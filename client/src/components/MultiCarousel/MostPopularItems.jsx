import React, { useEffect, useState, useRef } from 'react'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, A11y, Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MostPopularItems = () => {
    const getData = useSelector((state)=>state.allCart.cart)
    const swiperRef = useRef(null);

    const handlePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };
    return (
        <div className={"overflow-hidden"}>
            <div className='relative flex justify-between items-center border-b-2 py-2 lg:w-auto'>
                <h1 className='text-xl font-bold'>Most Popular</h1>
                <div className="flex justify-start items-center gap-4">
                    <button
                        className="sm:text-[2rem] text-[13px] uppercase font-[700] text-blue-600 hover:text-green-600 active:text-green-600 cursor-pointer"
                        onClick={handlePrev}
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        className="sm:text-[2rem] text-[13px] uppercase font-[700] text-blue-600 hover:text-green-600 active:text-green-600 cursor-pointer"
                        onClick={handleNext}
                    >
                        <FaAngleRight />
                    </button>
                </div>
                <div className='absolute bottom-[-2%] left-[0%] w-[15%] h-[2px] border-b-2 border-red-600 flex justify-center items-baseline'>
                    <span className='h-[10px] w-[10px] clip-polygon bg-red-600 block'></span>
                </div>
            </div>
            <Swiper
                effect={'fade'}
                modules={[EffectFade, A11y, Navigation]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}

                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}
                className="my-10"
            >
                <SwiperSlide>
                    {
                        getData && getData.slice(0, 2).map((item) => (
                            <div key={item._id} className='flex w-full gap-4 '>
                                <Link onClick={()=>(window.scroll(0,0))} to={`product/${item._id}`}  className='self-start w-24'>
                                    <img src={item.image[0]} />
                                </Link>
                                <div className='flex flex-col justify-center'>
                                    <Link onClick={()=>(window.scroll(0,0))} to={`product/${item._id}`} className='font-bold text-sm text-start cursor-pointer hover:text-blue-600'>{item.title}</Link>
                                    <span className='text-xs font-bold text-gray-500 text-start'>{item.price}</span>
                                    <span className='text-xs font-bold text-gray-500 text-start'>{item.subTitle}</span>
                                </div>
                            </div>
                        ))
                    }
                </SwiperSlide>
                <SwiperSlide>
                    {
                         getData && getData.slice(3, 5).map((item) => (
                            <div key={item._id} className='flex gap-4 w-full bg-white'>
                                <Link onClick={()=>(window.scroll(0,0))} to={`product/${item._id}`} className='self-start w-24'>
                                    <img src={item.image[0]} />
                                </Link>
                                <div className='flex flex-col justify-center'>
                                <Link to={`product/${item._id}`} className='font-bold text-sm text-start cursor-pointer hover:text-blue-600'>{item.title}</Link>
                                    <span className='text-xs font-bold text-gray-500 text-start'>{item.price}</span>
                                    <span className='text-xs font-bold text-gray-500 text-start'>{item.subTitle}</span>
                                </div>
                            </div>
                        ))
                    }
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default MostPopularItems