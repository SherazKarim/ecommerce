import React, { useEffect, useState } from 'react'
import Wrapper from '../wrapper/Wrapper'
import { CiHeart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ViewedProduct = () => {
    const getProducts = useSelector((state)=>state.allCart.cart)
  
    return (
        <Wrapper className=''>
            <h1 className='text-start mb-10 font-semibold text-[1.6rem]'>Most Viewed Items</h1>
            <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-3 w-full'>
                {getProducts && getProducts.slice(4,8).map((item) => (
                    <Link to={`product/${item._id}`} className="group relative overflow-hidden duration-500" key={item._id}>
                        <div className='lightbox transition-all duration-500 group-hover:opacity-60 flex flex-col border border-r-1 border-gray-200 w-full px-12 pt-10 pb-8'>
                        <img src={item.image[0]} alt="" />
                            <div className='flex flex-col lg:justify-start lg:items-start justify-center items-center'>
                                <h1 className='font-semibold text-sm text-[#6a6e7c] text-start mb-1'>{item.title}</h1>
                                <span className='font-semibold text-[15px] text-black'>{item.subTitle}</span>
                                <span className='font-semibold text-[15px] text-black text-start'>{item.discount}</span>
                                <div className='flex mt-1'>
                                    <span className='font-normal text-[15px] text-red-300 me-3 line-through'>{item.price}</span>
                                    <span className='font-normal text-[15px] text-red-800'>{item.discount}</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute m-5 flex-row self-end justify-end items-end right-0 -top-20 group-hover:top-2 transition-all duration-500 ">
                            <CiHeart color='red' size={"20px"}/>
                        </div>
                    </Link>
                ))
                }
            </div>
        </Wrapper>
    )
}
