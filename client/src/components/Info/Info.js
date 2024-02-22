import React from 'react'
import { FaCar } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { HiOutlineArrowUturnDown } from "react-icons/hi2";
import { TbMoneybag } from "react-icons/tb";
import { FaHeadset } from "react-icons/fa";
import Wrapper from '../wrapper/Wrapper';

export const Info = () => {
    const data = [
        {
            id: 1,
            img: <FaCar size={"40px"} color='red' />,
            title: "Free Delivery",
            desc: "from $78"
        },
        {
            id: 2,
            img: <FaPeopleGroup size={"40px"} color='red' />,
            title: "99% Customer",
            desc: "feedbacks"
        },
        {
            id: 3,
            img: <HiOutlineArrowUturnDown size={"40px"} color='red' />,
            title: "10 Days",
            desc: "for free return"
        },
        {
            id: 4,
            img: <TbMoneybag size={"40px"} color='red' />,
            title: "Payment",
            desc: "secure system"
        },
        {
            id: 5,
            img: <FaHeadset size={"40px"} color='red' />,
            title: "24/7",
            desc: "online supports"
        },

    ]
    return (
        <Wrapper className=' mx-auto my-10 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2'>
            {
                data.map((item) => (
                    <div key={item.id} className='flex border border-r-1 border-gray-200 w-full px-8 py-5'>
                        <div className='self-center me-5'>
                            {item.img}
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='font-bold text-sm text-start'>{item.title}</h1>
                            <span className='text-xs font-bold text-gray-500 text-start'>{item.desc}</span>
                        </div>
                    </div>
                ))
            }
        </Wrapper>
    )
}
