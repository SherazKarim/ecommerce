import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/wrapper/Wrapper'
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import { removeItem } from '../../app/features/productSlice';
import { Link } from 'react-router-dom';

export const ViewCart = () => {
    const [cartContent, setCartContent] = useState([]);
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.allCart);
    const [totalAmt, setTotalAmt] = useState("");
    const [shippingCharge, setShippingCharge] = useState("");

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    const profile = profileData || currentUser;

    useEffect(() => {
        setCartContent(cartItems)
    }, [cartItems])

    function decreaseHandler(id) {
        let testId = cartContent.map((item) => {
            if (item._id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 }
            } else {
                return item
            }
        })
        setCartContent(testId)
    }

    function increaseHandler(id) {
        let testId = cartContent.map((item) => {
            if (item._id === id && item.quantity < 5) {
                return { ...item, quantity: item.quantity + 1 }
            } else {
                return item
            }
        })
        setCartContent(testId)
    };

    useEffect(() => {
        let price = 0;
        cartContent?.map((item) => {
            price += item.price * item.quantity;
            return price;
        });
        setTotalAmt(price);
    }, [cartContent]);

    useEffect(() => {
        if (totalAmt <= 200) {
            setShippingCharge(30);
        } else if (totalAmt <= 400) {
            setShippingCharge(25);
        } else if (totalAmt > 401) {
            setShippingCharge(20);
        }
    }, [totalAmt]);

    return (
        <div>
            <div className='bg-[#fafafa] mb-8'>
                <Wrapper className='flex items-start font-semibold gap-5 justify-start py-6'>
                    <Link to='/'><span>Home &gt;</span></Link>
                    <span className='text-gray-500'>Cart</span>
                </Wrapper>
            </div>

            <Wrapper className="h-auto w-full flex flex-col overflow-x-auto shadow-md sm:rounded-lg">
                <div className={`h-auto bg-[#fafafa] ${cartContent && cartContent.length <= 0 ? "py-20 mt-5" : "pt-20"}`}>
                    {cartContent && cartContent.length <= 0 ? <div className='flex flex-col justify-center items-center '>
                        <h3 className='text-[2rem] font-bold'>Your cart is empty!</h3>
                        <Link to={"/"}>
                            <button className='bg-red-700 rounded-full text-sm text-white py-3 px-6 hover:bg-green-500'>
                                Shop Now
                            </button>
                        </Link>
                    </div> :
                        <> <h1 className="mb-10 text-center text-2xl font-bold">Cart Items: {cartContent && cartContent.length}</h1>
                            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                                <div className="rounded-lg md:w-2/3">
                                    {
                                        cartContent?.map((item) => (

                                            <div key={item._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                                <img src={item.image[0]} alt="product-image" className="w-full rounded-lg sm:w-40" />
                                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                                    <div className="mt-5 sm:mt-0">
                                                        <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
                                                        <p className="mt-1 text-xs text-gray-700">${item.price}</p>
                                                    </div>
                                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block ">
                                                        <div className='flex gap-10'>
                                                            <div className="bg-white flex justify-center border gap-5 rounded-sm text-[25px] text-[#344151]">
                                                                <button onClick={() => decreaseHandler(item._id)} className='border-r text-center w-10 border-[#bfbfbf] text-xl'>
                                                                    -
                                                                </button>
                                                                <div className='font-normal text-sm flex items-center'>
                                                                    {item.quantity}
                                                                </div>
                                                                <button onClick={() => increaseHandler(item._id)} className='border-l text-center w-10 border-[#bfbfbf] text-xl'>
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-sm">${item.price * item.quantity}</p>
                                                            <RxCross2 className='cursor-pointer hover:text-red-600' onClick={() => dispatch(removeItem(item._id))} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))


                                    }
                                </div>
                                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                                    <div className="mb-2 flex justify-between">
                                        <p className="text-gray-700">Subtotal</p>
                                        <p className="text-gray-700">${totalAmt}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-gray-700">Shipping</p>
                                        <p className="text-gray-700">${shippingCharge}</p>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="flex justify-between">
                                        <p className="text-lg font-bold">Total</p>
                                        <div className="">
                                            <p className="mb-1 text-lg font-bold">${totalAmt + shippingCharge} USD</p>
                                            <p className="text-sm text-gray-700">including VAT</p>
                                        </div>
                                    </div>
                                    <Link to={"/placeorder"} state={{items:cartContent, totalAmt:totalAmt, shippingCharge:shippingCharge}} className="mt-6 block text-center w-full rounded-md bg-red-600 py-1.5 font-medium text-blue-50 hover:bg-green-500">Place Order</Link>
                                </div>
                            </div></>
                    }
                </div>
            </Wrapper>
        </div>
    )
}
