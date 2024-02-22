import React, { useState, useEffect } from 'react';
import Wrapper from '../../components/wrapper/Wrapper';
import { IoIosSearch } from "react-icons/io";
import { Cart } from './Cart';
import { Link, useParams } from 'react-router-dom';
import { newRequest } from '../../components/utills/newRequest';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../app/features/productSlice';
import { TiTick } from "react-icons/ti";

export const ProductDetails = () => {
    const cartItems = useSelector((state) => state.allCart.cartItems)

    const [count, setCount] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [openCart, setOpenCart] = useState(false);
    const [loader, setLoader] = useState(true)
    const params = useParams()
    const [data, setData] = useState([]);
    const dispatch = useDispatch()


    const fetchData = async () => {
        try {
            const response = await newRequest.get(`product/single/${params.id}`);
            const result = await response.data;
            setData(result)
            setLoader(false)
        } catch (error) {
            setLoader(false)
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    const itemExistInCart = cartItems.some(item => item._id === params.id)


    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const openImageInNewTab = () => {
        if (selectedImage) {
            window.open(selectedImage, '_blank');
        }
    };

    const handleAddtoCart = () => {
        const cartData = { ...data, quantity: count };
        dispatch(addToCart(cartData));
        setOpenCart(true);
    };




    function decreaseHandler() {
        if (count <= 1) {
            setCount(count)
        } else {
            setCount(count - 1);
        }
    }

    function increaseHandler() {
        if (count >= 5) {
            setCount(count)
        } else {
            setCount(count + 1);
        }
    }

    return (
        <div>
            <div className='bg-[#fafafa]'>
                <Wrapper className='flex flex-wrap items-start font-semibold sm:gap-5 gap-2 justify-start py-6'>
                    <Link to="/"><h1>Home</h1></Link>
                    <span>&gt;</span>
                    <h1 className='text-gray-500'>products </h1>
                    <span>&gt;</span>
                    <h1>{data.title}</h1>
                </Wrapper>
            </div>
            {loader ? <h1>Loading....</h1> :
                <>
                    <div className='md:flex w-full px-8'>
                        <div className='md:w-[50%] w-full'>
                            <div className='relative self-center flex justify-center'>
                                <img className='w-[80%]' src={selectedImage || (data?.image?.length > 1 && data.image[0])} />
                                <IoIosSearch size='2rem' className='absolute top-8 right-36 z-9999 cursor-pointer hover:text-red-800' onClick={openImageInNewTab} />
                            </div>
                            <div className='flex gap-2'>
                                {
                                    data?.image?.length > 1 && data.image.map((item, index) => (
                                        <img key={index}
                                            className='border hover:opacity-70 cursor-pointer w-[20%]'
                                            src={item}
                                            onClick={() => handleImageClick(item)}
                                        />
                                    ))
                                }
                            </div>
                        </div>

                        <div className='flex flex-col mt-28 w-[50%]'>
                            <h1 className='font-bold text-2xl text-start'>{data.title}</h1>
                            <span className='text-sm font-bold text-start py-5'>About the product</span>
                            <span className='text-sm font-normal text-start w-[28rem]'>{data.desc}</span>
                            <span className='text-md font-semibold text-red-700 text-start py-5'>${data.price}</span>

                            <div className='flex gap-10'>
                                <div className="bg-white flex justify-center border gap-5 rounded-sm text-[25px] text-[#344151]">
                                    <button onClick={decreaseHandler} className='border-r text-center w-10 border-[#bfbfbf] text-xl'>
                                        -
                                    </button>
                                    <div className='font-normal text-sm flex items-center'>
                                        {count}
                                    </div>
                                    <button onClick={increaseHandler} className='border-l text-center w-10 border-[#bfbfbf] text-xl'>
                                        +
                                    </button>
                                </div>
                                <div onClick={() => handleAddtoCart()} className='flex gap-2 bg-red-700 whitespace-nowrap text-white py-3 px-4 rounded hover:bg-green-500 cursor-pointer'>
                                    <button  className=''>
                                        Add to cart
                                    </button>
                                    {itemExistInCart ?
                                        <TiTick size={'1.5rem'} /> : ""
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={` ${openCart ? 'bg-black/[0.40] z-50 h-[100vh] w-[100vw] top-0 mr-4 fixed right-0 overflow-auto transition-all ease duration-500' : "right-[-100%]"}`}>
                        <div className={` ${openCart ? "fixed overflow-y-scroll z-50 bg-white h-[100vh] w-[400px] top-0 transition-all duration-500 ease right-0" : "right-[-100%]"} `}>
                            {openCart &&

                                <Cart selectedImage={selectedImage} datas={data} setDatas={setData} openCart={openCart} setOpenCart={setOpenCart} />
                            }
                        </div>
                    </div>
                </>
            }

        </div>
    );
}

export default ProductDetails;
