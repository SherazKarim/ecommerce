import React, { useEffect, useState } from 'react';
import Wrapper from '../wrapper/Wrapper';
import { newRequest } from '../utills/newRequest';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spinner } from '../../Dashbord/components/spinner/Spinner';

export const DiscountProduct = () => {
    const getData = useSelector((state)=>state.allCart.cart);
    const [filterdDatas, setFilteredDatas] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    
    const data = [
        {
            id: 1,
            title: 40
        },
        {
            id: 2,
            title: 57
        },
        {
            id: 3,
            title: 75
        },
        {
            id: 4,
            title: 83
        },
    ];
    const [activeTab, setActiveTab] = useState(data[0].title);
   

    useEffect(() => {
        const fetchData = () => {
            if(getData){
                let dete = getData.filter((val) => val.discount === activeTab)
                setFilteredDatas(dete); 
                setIsLoading(false)
            } else{
                console.log("not fetching data")
            }
        };
        fetchData();
    }, [getData]);


    const handleClick = ({ title, _id }) => {
        const filteredData = getData.filter((prev) => prev.discount === title);
        setFilteredDatas(filteredData);
        setActiveTab(title);
    };

    return (
        <Wrapper className='lg:flex gap-10 min-h-[38rem]'>
            <div className=' lg:block hidden relative bg-gradient-to-b from-gray-200 to-gray-100 lg:w-80 w-full overflow-hidden'>
                <div className='flex flex-col items-start p-8'>
                    <h1 className='text-red-600 font-medium text-2xl'>Fashion</h1>
                    <span className='text-5xl font-extrabold text-start'>Jasux Shoes</span>
                    <button className='border border-r-1 border-gray-600 hover:bg-gray-300 mt-5 px-6 py-3 text-red-600 rounded-md'>View Collections</button>
                </div>
                <div className='flex justify-end pe-10 '>
                    <div className='bg-red-700 rounded-[100%] w-24 h-24 flex flex-col items-center justify-center'>
                        <h1 className='text-white font-extrabold text-[1.3rem]'>57%</h1>
                        <span className='text-white'>Offer</span>
                    </div>
                </div>
                <div className='absolute bottom-0 -left-16'>
                    <img src="https://www.freepnglogos.com/uploads/shoes-png/dance-shoes-png-transparent-dance-shoes-images-5.png" alt="" />
                </div>
            </div>

            <div className='w-full mt-5'>
                <div className='relative border-b-2 border-gray-200 flex lg:flex-row flex-col w-full lg:justify-between justify-center h-fit'>
                    <h1 className='font-semibold text-2xl lg:text-start text-center'>Discount Product</h1>
                    
                    <div className='lg:absolute flex-row right-0 top-1  flex lg:justify-between justify-evenly lg:mt-0 mt-3 lg:w-96'>
                        {
                            data.map((item) => (
                                <div className='group' key={item.id}  onClick={() => handleClick({ title: item.title, _id: item.id })}>
                                    <h3 className={`relative cursor-pointer font-semibold lg:text-[1.2rem] text-[16px] text-gray-400 ${activeTab === item.title ? "text-red-700 lg:border-b-2 border-red-700" : "hover:text-red-700 lg:hover:border-b-2 lg:border-red-700"} `}>{item.title}% off
                                        <span className={`absolute  left-[50%] -translate-x-[50%] h-[10px] w-[10px] ${activeTab === item.title ? "bg-red-700" : "bg-red-700 group-hover:opacity-100 opacity-0"} clip-polygon lg:block hidden transition-opacity duration-300`}></span></h3>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className=' grid lg:grid-cols-4 sm:grid-cols-2 gap-3 w-full mt-3'>
                    {isLoading ? <Spinner/> : filterdDatas?.map((item) => (
                        <Link to={`product/${item._id}`} key={item._id} className='hover:shadow-2xl transition-all duration-500 hover:opacity-60 flex flex-col w-full pt-10 px-12 py-2'>
                            <img className='h-auto lg:w-36' src={item?.image && item?.image[0]} />
                            <div className='flex flex-col lg:justify-start lg:items-start justify-center items-center gap-1 w-full'>
                                <span className='font-semibold whitespace-nowrap text-[15px] text-black'>{item.subTitle}</span>
                                <span className='font-semibold text-[15px] text-black text-start'>{item.title}</span>
                                <div className='flex justify-between'>
                                    {item.discount && (
                                        <>
                                            <span className=' text-[18px] font-[600] text-red-300  line-through'>{item.discount}%</span>
                                            <span>-</span>
                                        </>
                                    )}
                                    <span className='text-[18px] font-[600] text-red-800'>${item.price}</span>
                                </div>
                            </div>
                        </Link>
                    ))
                    }
                </div>
            </div>
        </Wrapper>
    );
};

export default DiscountProduct;

