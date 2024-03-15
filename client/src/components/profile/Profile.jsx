import React, { useEffect, useRef, useState } from 'react'
import UpdateImage from '../updateImage/UpdateImage';

const UserProfile = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    const profile = profileData || currentUser;
    const handleDropdownClick = () => {
        setOpenDropdown(!openDropdown);
    };

    const handleDropdownContentClick = (event) => {
        // Prevent the event from bubbling up to the container
        event.stopPropagation();
    };
    const handleClick = () => {
        setOpenDropdown(!openDropdown);
    };

    useEffect(() => {
        const handleCloseDrop = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(false);
            }
        };

        window.addEventListener('click', handleCloseDrop);

        return () => {
            window.removeEventListener('click', handleCloseDrop);
        };
    }, []);



    //destructuring user image and checking admin
    const userImage = profile ? profile?.image || profile?.user?.image : ""
    return (
        <>
            <div className="relative w-full cursor-pointer h-auto" ref={dropdownRef} onClick={() => handleClick()}>
                {userImage ? (
                    <img className="w-10 h-10 rounded-full" src={userImage} alt="" />
                ) : (
                    <h1 className="w-10 h-10 rounded-full bg-gray-300 text-xl font-[600] flex justify-center items-center">{profile?.user?.name.slice(0, 1)}</h1>
                )}
                <div onClick={handleDropdownClick}>
                    {openDropdown && (
                        <div className="dropdown" onClick={handleDropdownContentClick}>
                            <UpdateImage profile={profile} userImage={userImage} setOpenDropdown={setOpenDropdown} />
                        </div>
                    )}
                </div>
            </div >
        </>
    )
}

export default UserProfile