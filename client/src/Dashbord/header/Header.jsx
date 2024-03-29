import React from 'react'
import UserProfile from '../../components/profile/Profile'
import { HiMiniBars3BottomRight } from "react-icons/hi2";
const Header = ({openSideBar, setOpenSideBar}) => {
  return (
    <div className='flex justify-between items-center w-full py-3 px-4 shadow-md'>
        <h1 className='text-[2rem] text-[400] flex gap-x-2 items-center'>
         <HiMiniBars3BottomRight onClick={() => setOpenSideBar(true)} className='text-[1.4rem] cursor-pointer'/>
          Admin</h1>
        <div>
          <UserProfile />
        </div>
    </div>
  )
}

export default Header