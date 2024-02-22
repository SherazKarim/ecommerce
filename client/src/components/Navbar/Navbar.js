import React, { useState } from 'react'
import { FiHeart } from "react-icons/fi";
import { RiShoppingBagLine } from "react-icons/ri";
import Wrapper from '../wrapper/Wrapper';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from 'react-redux';

export const Navbar = () => {
  const [openNavMobile, setOpenNavMobile] = useState(false)
  const {cartItems} = useSelector((state)=>state.allCart)

  const navLinks = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "About", link: "/" },
    { id: 3, name: "Shop", link: "/shopNow" },
    { id: 4, name: "Blog", link: "/" },
    { id: 5, name: "Gallery", link: "/" },
  ]
  return (
    <div className="grid min-h-[100px] w-full rounded-lg p-6 lg:overflow-visible">
      <div className="-m-6 max-h-[768px] w-[calc(100%+48px)]">
        <nav
          className="sticky top-0 z-10 block w-full max-w-full px-4 py-2 text-black bg-white border rounded-none shadow-md h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
          <Wrapper className="flex items-center justify-between text-blue-gray-900">
            <img src='https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/logo-1.png' />
            <div className="flex justify-center items-center gap-4">
              <div className={`lg:static fixed lg:h-auto h-[100vh] lg:w-auto w-[100%] lg:bg-transparent bg-gray-400/[0.20] top-0 ${openNavMobile ? "left-0" : "left-[-100%]"} mr-4 lg:block transition-all ease-in duration-500`}>
                <ul className={`flex flex-col gap-4 px-5 lg:mt-2 mb-4 lg:mb-0 lg:flex-row lg:items-center lg:gap-6 ${openNavMobile ? "left-0" : "left-[-100%]"} lg:w-auto w-[25%]  lg:h-auto h-[100vh]  lg:bg-transparent bg-white`}>
                  {
                    openNavMobile ? 
                    <div className='flex justify-end'>
                    <RxCross1 className='hover:bg-gray-200 mt-5' onClick={() => setOpenNavMobile(false)} />
                  </div>:null
                  }
                  
                  {
                    navLinks.map((item) => (
                      <li onClick={() => setOpenNavMobile(false)} key={item.id} className="block p-1 font-sans text-sm antialiased font-medium text-blue-gray-900">
                        <Link to={item.link} className="flex hover:text-blue-600 items-center">
                          {item.name}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="flex justify-center items-center gap-x-1 ml-8">
                <button
                  className="px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                  type="button">
                  <FiHeart size={'2rem'} />
                </button>
                <button
                  className=" px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button">
                    <Link to='/viewCart' className='flex items-center justify-center'>
                    <RiShoppingBagLine className='absolute' size={'2rem'} />
                    <div className='bg-red-600 rounded-full h-4 w-4 flex items-center justify-center text-white p-2 left-2 bottom-2 relative'>{cartItems && cartItems.length}</div>
                    </Link>
                </button>
                <button className='lg:hidden flex justify-center items-center h-[25px] w-[25px]' onClick={(prev) => setOpenNavMobile(!openNavMobile)}><RxHamburgerMenu size={'2rem'} /></button>
              </div>
            </div>
          </Wrapper>
        </nav>
      </div>
    </div>
  )
}
