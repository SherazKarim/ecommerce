import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { IoCartSharp } from "react-icons/io5";
import { IoBag } from "react-icons/io5";
import { RiAddBoxFill } from "react-icons/ri";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { FaHome } from 'react-icons/fa';

const SideBar = ({openSideBar, setOpenSideBar}) => {

    const sideBardata = [
        {
            id: 1,
            title: "Back to Home",
            icon: <FaHome />,
            link:"/"
        },
        {
            id: 2,
            title: "Dashboard",
            icon: <MdDashboard />,
            link:"/admin"
        },
        {
            id: 3,
            title: "Orders",
            icon: <IoCartSharp />,
            link: "/admin/orders"
        },
        {
            id: 4,
            title: "products",
            icon: <IoBag />,
            link: "/admin/products"

        },
        {
            id: 5,
            title: "Add products",
            icon: <RiAddBoxFill />,
            link: "/admin/addproducts"
        },
        {
            id: 6,
            title: "Message",
            icon:<BiSolidMessageSquareDots />,
            link: "#"
            
        },
        {
            id: 7,
            title: "Users",
            icon: <FaUsers />,
            link: "/admin/users"
        },
        {
            id: 8,
            title: "Settings",
            icon: <IoSettings />,
            link: "#"
        },
    ];

    return (
        <div className={`lg:col-span-2 lg:block lg:h-[calc(100vh-90px)] h-[100vh] lg:static fixed top-0 z-40  ${openSideBar ? "left-0" : "left-[-100%]"} transition-all duration-300 ease w-full lg:bg-transparent bg-gray-100/[0.45]`}>
            <ul className='flex flex-col justify-start border-r items-start px-4 gap-y-4 lg:bg-transparent bg-white w-[200px] h-[100vh] lg:py-0 py-2'>
              {openSideBar && <FaXmark className='self-end text-[20px] text-[500] cursor-pointer' onClick={() => setOpenSideBar(false)}/>}
                {
                    sideBardata.map((item) => (
                        <Link to={item.link} key={item.id} onClick={() => setOpenSideBar(false)} className='w-full py-2 flex justify-start items-center gap-x-4  bg-gray-100/[0.25] hover:bg-blue-100/[0.40] transition-colors duration-200 ease rounded-full px-2'>
                            <span className='block text-[18px] text-[400]'>{item.icon}</span>
                            {item.title}
                        </Link>
                    ))
                }
            </ul>
        </div>
    )
}

export default SideBar