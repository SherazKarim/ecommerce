import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AOS from 'aos'

import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import Wrapper from '../wrapper/Wrapper';
import { Link } from 'react-router-dom';

export const Carousel = () => {
    const [transform, setTransform] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY, target } = e;
        const { left, top, width, height } = target.getBoundingClientRect();

        const offsetX = clientX - left;
        const offsetY = clientY - top;

        const centerX = width / 5;
        const centerY = height / 5;

        const moveX = (offsetX - centerX) / 10;
        const moveY = (offsetY - centerY) / 10;

        setTransform({ x: moveX, y: moveY });
    };


      useEffect(() => {
        // Delay AOS initialization slightly to ensure elements are loaded
          AOS.init({
            effect: 'fade', // Adjust animation effect as needed
            duration: 1000, // Adjust animation duration
          });    
      }, []);

      const handleSlideChange = () => {
        AOS.refreshHard(); // Refresh AOS animations on slide change
      };
    
    return (
        <>
            <Swiper
             onSlideChange={handleSlideChange}
                effect={'fade'}
                navigation={false}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination]}
                className="mt-10 w-full"
            >
                <Wrapper>
                    <SwiperSlide>
                        <div className="flex lg:flex-row flex-col justify-center items-center bg-cover bg-[url('https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/slider-2.jpg')]  pb-[10rem]">
                            <div className=' flex flex-col justify-center ps-24 pe-1 lg:w-[50%]' data-aos="fade-left" data-aos-duration="2000" >
                                <h1 className='text-red-800 text-start font-bold text-3xl'>Our Exclusive</h1>
                                <h2 className='font-bold text-start my-5 text-[3rem]'>Addidas Campus</h2>
                                <p className='font-semibold text-lg text-start'>We have all your auto parts needs! Are you looking for the best performance car parts and car accessories</p>
                                <Link to='/shopNow'
                                    className='bg-black hover:bg-orange-600 transition-all duration-200 ease-in-out  text-white flex font-semibold w-fit text-sm px-7 py-4 mt-5'>View Collection</Link>
                            </div>
                            <div className='relative lg:w-[60%] w-full  flex justify-center items-center'>
                                <img className='w-[300px]' src='https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/re_run-min-1.png' data-aos="fade-down" data-aos-duration="2000" />
                                <div
                                    className="absolute w-[100%] top-[20%]  flex justify-center items-center"
                                    onMouseMove={handleMouseMove}
                                    data-aos="fade-up" data-aos-duration="2000"
                                >
                                    <img
                                        id="image"
                                        className="w-[550px] z-50 transition-all duration-300 ease-in-out"
                                        src="https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2021/06/red_shoe-min-1-1.png"
                                        alt="Your Image"
                                        style={{
                                            transform: `translate(${transform.x}px, ${transform.y}px)`,
                                        }}
                                    />
                                </div>
                            </div>

                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lg:flex bg-cover bg-[url('https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/slider-1.jpg')]  pb-[6rem]">
                        <div className=' flex flex-col justify-center ps-24 pe-1 lg:w-[50%]' data-aos="fade-left" data-aos-duration="2000" >
                                <h1 className='text-red-800 text-start font-bold text-3xl'>Our Exclusive</h1>
                                <h2 className='font-bold text-start my-5 text-[3rem]'>Addidas Campus</h2>
                                <p className='font-semibold text-lg text-start'>We have all your auto parts needs! Are you looking for the best performance car parts and car accessories</p>
                                <button
                                    className='bg-black hover:bg-orange-600 text-white flex font-semibold w-fit text-sm px-7 py-4 mt-5'>View Collection</button>
                            </div>
                            <div className='relative lg:w-[60%]'>
                                <img className='w-[300px]' src='https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/revslider/shoes/blue_text-min.png' data-aos="fade-down" data-aos-duration="2000" />
                                <div
                                    className="absolute w-[100%] top-[20%]"
                                    onMouseMove={handleMouseMove}
                                    data-aos="fade-up" data-aos-duration="2000"
                                >
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

                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lg:flex bg-cover bg-[url('https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/slider-3.jpg')]  pb-[6rem]">
                        <div className=' flex flex-col justify-center ps-24 pe-1 lg:w-[50%]' data-aos="fade-left" data-aos-duration="2000" >
                                <h1 className='text-red-800 text-start font-bold text-3xl'>Our Exclusive</h1>
                                <h2 className='font-bold text-start my-5 text-[3rem]'>Addidas Campus</h2>
                                <p className='font-semibold text-lg text-start'>We have all your auto parts needs! Are you looking for the best performance car parts and car accessories</p>
                                <button
                                    className='bg-black hover:bg-orange-600 text-white flex font-semibold w-fit text-sm px-7 py-4 mt-5'>View Collection</button>
                            </div>
                            <div className='relative lg:w-[60%]'>
                                <img className='w-[300px]' src='https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/run_text.png' data-aos="fade-down" data-aos-duration="2000" />
                                <div
                                    className="absolute w-[100%] top-[20%]"
                                    onMouseMove={handleMouseMove}
                                    data-aos="fade-up" data-aos-duration="2000"
                                >
                                    <img
                                        id="image"
                                        className="w-[550px] z-50 transition-all duration-300 ease-in-out"
                                        src="https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/yellow-shoe.png"
                                        alt="Your Image"
                                        style={{
                                            transform: `translate(${transform.x}px, ${transform.y}px)`,
                                        }}
                                    />
                                </div>
                            </div>

                        </div>
                    </SwiperSlide>
                </Wrapper>
            </Swiper>
        </>
    );
}
