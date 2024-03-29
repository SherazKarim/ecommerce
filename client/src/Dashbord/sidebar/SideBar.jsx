import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { MdDashboard } from 'react-icons/md';
import { IoCartSharp, IoBag, IoSettings } from 'react-icons/io5';
import { RiAddBoxFill } from 'react-icons/ri';
import { BiSolidMessageSquareDots } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';

const SideBar = ({ openSideBar, setOpenSideBar, navbarRef }) => {
  const sideBardata = [
    { id: 1, title: 'Back to Home', icon: <FaHome />, link: '/' },
    { id: 2, title: 'Dashboard', icon: <MdDashboard />, link: '/admin' },
    { id: 3, title: 'Orders', icon: <IoCartSharp />, link: '/admin/orders' },
    { id: 4, title: 'Products', icon: <IoBag />, link: '/admin/products' },
    { id: 5, title: 'Add Products', icon: <RiAddBoxFill />, link: '/admin/addproducts' },
    { id: 6, title: 'Message', icon: <BiSolidMessageSquareDots />, link: '#' },
    { id: 7, title: 'Users', icon: <FaUsers />, link: '/admin/users' },
    { id: 8, title: 'Settings', icon: <IoSettings />, link: '#' },
  ];

  return (
    <div
      ref={navbarRef}
      className={`h-screen p-0 transition-all duration-300 ease-in overflow-y-hidden ${
        openSideBar ? 'col-span-2 block' : 'hidden'
      } transition-all duration-300 ease w-full`}
    >
      <ul className='flex flex-col justify-start border-r items-start px-4 gap-y-4 bg-gray-50 w-48 lg:py-0 py-2'>
        {openSideBar && (
          <FaXmark
            className='self-end text-[20px] text-[500] cursor-pointer'
            onClick={() => setOpenSideBar(false)}
          />
        )}
        {sideBardata.map((item) => (
          <Link
            to={item.link}
            key={item.id}
            onClick={() => setOpenSideBar(false)}
            className='w-full py-2 flex justify-start items-center gap-x-4 bg-gray-100/[0.25] hover:bg-blue-100/[0.40] transition-colors duration-200 ease rounded-full px-2'
          >
            <span className='block text-[18px] text-[400]'>{item.icon}</span>
            {item.title}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
