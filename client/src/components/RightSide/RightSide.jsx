// RightSide.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { newRequest } from "../utills/newRequest";

export const RightSide = ({allProducts, loading, maxRange, filteredProducts, setFilteredProducts,handleCategory }) => {
   
    const data = [
        {
            id: 1,
            title: "Popularity"
        },
        {
            id: 2,
            title: "Average Rating"
        },
        {
            id: 3,
            title: "Newness"
        },
        {
            id: 4,
            title: "Price: Low to high"
        },
        {
            id: 5,
            title: "Price: high to low"
        },
    ]

    const handleClick = (id) => {
        switch (id) {
            case 1:
                const sortedProductsByPopularity = allProducts.sort((a, b) => b.popularity - a.popularity);
                setFilteredProducts(sortedProductsByPopularity);
                break;
            case 2:
                const averagePrice = allProducts.reduce((acc, product) => acc + product.price, 0) / allProducts.length;
                const priceRange = averagePrice * 0.30;
                const averagePricedProducts = allProducts.filter(product =>
                    product.price >= averagePrice - priceRange && product.price <= averagePrice + priceRange);
                setFilteredProducts(averagePricedProducts);
                break;
            case 3:
                const sortedProductsByDate = [...allProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setFilteredProducts(sortedProductsByDate);
                break;
            case 4:

                const sortedProductsByPriceAsc = [...allProducts].sort((a, b) => a.price - b.price);
                setFilteredProducts(sortedProductsByPriceAsc);
                break;
            case 5:

                const sortedProductsByPriceDesc = [...allProducts].sort((a, b) => b.price - a.price);
                setFilteredProducts(sortedProductsByPriceDesc);
                break;
            default:
                console.log("err");
        }

    }
    // const handleCategory = (categoryTitle) => {
    //     const filteredProducts = allProducts.filter(product => product.title === categoryTitle);
    //     setFilteredProducts(filteredProducts);
    // };
    return (
        <div className=' w-full'>
            <div className='flex bg-[#fafafa] h-fit py-5 mb-5 px-7 w-full justify-between'>
                <h1>Shop</h1>
                <div className='flex'>
                    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className=" font-medium text-sm  text-center inline-flex items-center " type="button">Sort By <svg className="w-2.5 h-2.5 ms-16" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                    </button>

                    <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            {
                                data.map((item) => (
                                    <li key={item.id}>
                                        <a href="#" onClick={() => handleClick(item.id)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item.title}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`${filteredProducts.length > 0 && "grid lg:grid-cols-4 sm:grid-cols-2"} gap-3 w-full`}>
                {
                    loading && <h1>loading...</h1>
                }
                {filteredProducts.length <=0 ? <h1 className="text-2xl text-center text-[600] w-full">No Such products Found!</h1> :
                    filteredProducts.map((item) => (
                        <Link
                            to={`/product/${item._id}`}
                            key={item._id}
                            state={{ item }}
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            <div className="group relative overflow-hidden duration-500">
                                <div className="lightbox transition-all duration-500 group-hover:opacity-60 flex flex-col border border-r-1 border-gray-200 w-full px-12 pt-10 pb-8">
                                    <img className="h-auto lg:w-36 w-full" src={item.image[0]} />
                                    <div className="flex flex-col lg:justify-start lg:items-start justify-center items-center">
                                        <h1 className="font-semibold text-sm text-[#6a6e7c] text-start mb-1">{item.title}</h1>
                                        <span className="font-semibold text-[15px] text-black">{item.subTitle}</span>
                                        <span className="font-semibold text-[15px] text-black text-start">{item.discount}</span>
                                        <div className="flex mt-1">
                                            <span className="font-normal text-[15px] text-red-300 me-3 line-through">{item.discount}</span>
                                            <span>-</span>
                                            <span className="font-normal text-[15px] text-red-800 ms-3">${item.price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute right-0 m-5 flex-row self-end justify-end items-end -top-20 group-hover:top-2 transition-all duration-500 ">
                                    <CiHeart color="red" size={"20px"} />
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};
