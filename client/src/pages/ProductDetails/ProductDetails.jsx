import React, { useState, useEffect } from 'react';
import Wrapper from '../../components/wrapper/Wrapper';
import { IoIosSearch } from "react-icons/io";
import { Cart } from './Cart';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { newRequest } from '../../components/utills/newRequest';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../app/features/productSlice';
import { TiTick } from "react-icons/ti";
import { Spinner } from '../../Dashbord/components/spinner/Spinner';
import { Index } from '../../components/Reviews/Index';

export const ProductDetails = () => {
    const cartItems = useSelector((state) => state.allCart.cartItems)
    const [count, setCount] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [openCart, setOpenCart] = useState(false);
    const [loader, setLoader] = useState(true)
    const params = useParams()
    const [data, setData] = useState([]);
    const dispatch = useDispatch()
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const response = await newRequest.get(`product/single/${params.id}`);
            const result = await response.data;
            setData(result)
            setLoader(false)
        } catch (error) {
            setLoader(false)
            console.error(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])


    const itemExistInCart = cartItems?.isArray ? cartItems.some(item => item._id === params.id) : null

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const openImageInNewTab = () => {
        if (selectedImage) {
            window.open(selectedImage, '_blank');
        }
    };
    const profileData = JSON.parse(localStorage.getItem("profileData"))
    // logout fucntion
    const profile = profileData || currentUser;

    const handleAddtoCart = () => {
        if (profile) {
            const cartData = { ...data, quantity: count };
            dispatch(addToCart(cartData));
            setOpenCart(true);
        } else {
            navigate("/signIn")
        }
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
            {loader ? <Spinner /> :
                <>
                    {
                        data && Object.keys(data)?.length > 0 ? <>
                            <div className='md:flex w-full'>
                                <div className='md:w-[50%] w-full'>
                                    <div data-aos="flip-down" data-aos-duration="1000" className='relative self-center flex justify-center'>
                                        <img className='w-[80%]' src={selectedImage || (data?.image?.length > 1 || data.image[0])} />
                                        <div className='flex absolute left-24 top-5 z-10 justify-center polygon' data-aos="fade-down" data-aos-duration="2000">
                                            <div className='bg-red-700 rounded-[100%] w-20 h-20 flex flex-col items-center justify-center animate-spin-slow origin-center'>
                                                <h1 className='text-white font-extrabold z-30 text-[1.3rem]'>57%</h1>
                                                <span className='text-white'>Offer</span>
                                            </div>
                                        </div>
                                        <IoIosSearch size='2rem' className='absolute top-8 right-36 z-9999 cursor-pointer hover:text-red-800' onClick={openImageInNewTab} />

                                    </div>
                                    <Wrapper data-aos="zoom-out-left" data-aos-duration="1000" className='flex gap-2 ms-14'>
                                        {
                                            data?.image?.length > 1 || data.image.map((item, index) => (
                                                <img key={index}
                                                    className='border hover:opacity-70 cursor-pointer w-[20%]'
                                                    src={item}
                                                    onClick={() => handleImageClick(item)}
                                                />
                                            ))
                                        }
                                    </Wrapper>
                                </div>


                                <Wrapper data-aos="flip-left" data-aos-duration="1000" className='flex flex-col mt-28  lg:w-[50%]'>
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
                                            <button className=''>
                                                Add to cart
                                            </button>
                                            {itemExistInCart ?
                                                <TiTick size={'1.5rem'} /> : ""
                                            }

                                        </div>
                                    </div>
                                </Wrapper>
                            </div>
                            <Wrapper className={` ${openCart ? 'bg-black/[0.40] z-50 h-[100vh] w-[100vw] top-0 fixed right-0 overflow-auto transition-all ease duration-500' : "right-[-100%]"}`}>
                                <div className={` ${openCart ? "fixed overflow-y-scroll z-50 bg-white h-[100vh] w-[400px] top-0 transition-all duration-500 ease right-0" : "right-[-100%]"} `}>
                                    {openCart &&

                                        <Cart selectedImage={selectedImage} datas={data} setDatas={setData} openCart={openCart} setOpenCart={setOpenCart} />
                                    }
                                </div>
                            </Wrapper>
                            <Wrapper className={'mt-10'}>
                                <Index parentData={data} />
                            </Wrapper> </> : <div className='text-center font-medium md:text-[1.2rem] mx-auto'>Something went wrong check your internet connection and try again!</div>
                    }

                </>
            }

        </div>
    );
}

export default ProductDetails;
