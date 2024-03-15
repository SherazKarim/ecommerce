import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import Wrapper from "../wrapper/Wrapper"
import { useLocation } from 'react-router-dom';
export const Footer = () => {
    const data1 = [
        {
            id: 1,
            title: "New york"
        },
        {
            id: 2,
            title: "London SF"
        },
        {
            id: 3,
            title: "Cockfosters BP"
        },
        {
            id: 4,
            title: "Los Angeles"
        },
        {
            id: 5,
            title: "Albarto"
        },
        {
            id: 6,
            title: "Las Vegas"
        },
        {
            id: 7,
            title: "Chicago"
        }
    ]
    const data2 = [
        {
            id: 1,
            title: "Support Center"
        },
        {
            id: 2,
            title: "Term & Conditions"
        },
        {
            id: 3,
            title: "Shipping"
        },
        {
            id: 4,
            title: "Privacy Policy"
        },
        {
            id: 5,
            title: "Help"
        },
        {
            id: 6,
            title: "FAQS"
        },
        {
            id: 7,
            title: "Products Return"
        }
    ]
    return (
         <div className='mt-10 py-5 bg-[#fafafa] w-full'>
                <Wrapper className={"grid grid-cols-12  gap-5 w-full"}>
                    <div className='flex flex-col text-gray-500 lg:col-span-3 sm:col-span-6 col-span-12'>
                        <span className='text-sm'>Company guarante secured transaction by signing a debt guarantee guarantee contract with Bank</span>
                        <span className='text-sm'>for the amount of cash payment by the customer</span>
                        <span className='text-sm py-6'>17 Princess Road, London, Greater London NW1 8JR, UK</span>
                        <div className='bg-red-700 px-5 py-3 text-white rounded flex justify-center items-center gap-2 w-fit'>
                            <FaLocationDot />
                            <span className='text-sm'>View On Map</span>
                        </div>
                    </div>
                    <div className='flex gap-8  justify-between lg:col-span-3 sm:col-span-6 col-span-12'>
                        <div className='flex flex-col'>
                            <h1 className='font-bold pb-4'>Our Stores</h1>
                            <div className='gap-3 flex flex-col'>
                                {
                                    data1.map((item) => (
                                        <span key={item.id} className='text-sm font-normal text-gray-500'>{item.title}</span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col lg:col-span-3 sm:col-span-6 col-span-12'>
                        <h1 className='font-bold pb-4'>Quick Links</h1>
                        <div className='gap-3 flex flex-col'>
                            {
                                data2.map((item) => (
                                    <span key={item.id} className='text-sm font-normal text-gray-500'>{item.title}</span>
                                ))
                            }
                        </div>
                    </div>
                    <div className='flex flex-col lg:col-span-3 sm:col-span-6 col-span-12'>
                        <h1 className='font-bold pb-4'>Subscribe</h1>
                        <span className='text-sm'>Don’t miss to subscribe to our new feeds, kindly fill the form below.Company guarante secured transaction by signing a debt guarantee guarantee contract</span>
                    </div>
                </Wrapper>
                <span className='px-16 text-sm'>Copyrights By TechAlphaLogix - 2024</span>
            </div>
    )
}
