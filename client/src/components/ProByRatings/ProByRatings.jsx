import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { newRequest } from '../utills/newRequest';
import { Link } from 'react-router-dom';
import '../../../src/App.css'

export const ProByRatings = () => {
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await newRequest.get("/product/get");
                const result = response.data;
                setAllProducts(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllProducts();
    }, []);
    // console.log(allProducts)
    return (
        <div className='border px-6 py-4'>
            <h1 className='font-bold text-md left-[20px] heading relative z-5 before:bg-red-800 mb-5'>Products By Ratings</h1>
            {
                allProducts.slice(0, 3).map((items) => (
                    <Link
                        to={`${`/product/${items._id}` ? `/product/${items._id}` : `/shopNow/product/${items._id}`}`}
                        key={items._id}
                        state={{ items }}
                        onClick={() => window.scrollTo(0, 0)}
                        className='flex items-center justify-between border-b mb-5'
                    >
                        <div>
                            <h1 className='text-sm text-gray-600'>{items.title}</h1>
                            <div className='flex gap-5'>
                                <div className='flex'>
                                    <span><FaStar color='red' /></span>
                                    <span><FaStar color='red' /></span>
                                    <span><FaStar color='red' /></span>
                                    <span><FaStar color='red' /></span>
                                    <span><FaStar color='red' /></span>
                                </div>
                                <h1 className='text-sm text-red-800'>$400.00</h1>
                            </div>
                        </div>
                        <div className=''>
                            <img className='w-12' src={items.image[0]} />
                        </div>
                    </Link>
                ))
            }



        </div>
    )
}
