import React, { useEffect, useState } from 'react';

export const FilterProducts = ({ handleCategory }) => {
    const [activeTab, setActiveTab] = useState(null);

    const data = [
        {
            id:1,
            title:"Snikker"
        },
        {
            id:2,
            title:"Joggers"
        },
        {
            id:3,
            title:"Ndure"
        },
        {
            id:4,
            title:"Bata"
        },
    ];


    useEffect(() => {
        if (!handleCategory) {
            setActiveTab(null);
        }
    }, [handleCategory]);
    

    const handleClick = (title) => {        
        setActiveTab(title)
        handleCategory(title);
    };

    return (
        <div className='border px-6 py-4'>
            <h1 className='font-bold text-md left-[20px] heading relative z-5 before:bg-red-800 mb-5'>Product Categories</h1>
            <div className='flex flex-col text-sm font-normal gap-4 cursor-pointer '>
                {
                    data.map((items)=>(
                        <span key={items.id} onClick={() => handleClick(items.title)} className={`hover:text-blue-800 transition-all ease duration-150 text-[15px] font-[400] font-sans ${activeTab === items.title && "text-blue-800"}`}>{items.title}</span>
                    ))
                }
            </div>
        </div>
    );
};
