import React, { useState, useEffect } from 'react'
import { ImCancelCircle } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import Wrapper from '../../components/wrapper/Wrapper';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../app/features/productSlice';
export const Cart = ({ openCart, setOpenCart }) => {
    const { cartItems } = useSelector((state) => state.allCart)
    const [totalAmt, setTotalAmt] = useState("");
    const [shippingCharge, setShippingCharge] = useState("");

    useEffect(() => {
        let price = 0;
        cartItems?.map((item) => {
            price += item.price * item.quantity;
            return price;
        });
        setTotalAmt(price);
    }, [cartItems]);

    useEffect(() => {
        if (totalAmt <= 200) {
            setShippingCharge(30);
        } else if (totalAmt <= 400) {
            setShippingCharge(25);
        } else if (totalAmt > 401) {
            setShippingCharge(20);
        }
    }, [totalAmt]);

    setTimeout(() => {
        // setOpenCart(false)
    }, 3000)
    const cancel = () => {
        setOpenCart(false)
    }
    const dispatch = useDispatch()

    useEffect(() => {
        let price = 0;
        cartItems.map((item) => {
            price += item.price * item.quantity;
            return price;
        });
        setTotalAmt(price);
    }, [cartItems]);

    return (
        <>
            <div className='flex justify-between items-center border-b-2 mt-10 pb-4 mx-5'>
                <h1 className='text-lg font-bold'>Shoping Cart</h1>
                <ImCancelCircle className='cursor-pointer' onClick={() => cancel()} />
            </div>
            <Wrapper className='mx-auto flex flex-col'>
                {
                    cartItems && cartItems?.length <= 0 ? <h1 className='my-4 text-center font-bold'>No Products added in the cart yet!</h1> : cartItems?.map((item) => (
                        <div key={item._id} className='flex justify-between items-center px-8 py-1 w-[90%] mx-5 border-b-2'>
                            <div className='self-center flex justify-center items-center gap-3'>
                                <img src={item.image[0]} className='w-24' />
                                <div className='flex flex-col justify-center'>
                                    <h1 className='font-bold text-sm text-start text-blue-600 cursor-pointer hover:text-red-600'>{item.title}</h1>
                                    <div className='flex justify-between items-center gap-2'>
                                        <span className='text-xs font-bold text-gray-500 txt-start cursor-pointer '>{item.quantity}</span>
                                        <span>x</span>
                                        <span className='text-xs font-bold text-red-600  text-start'>${item.price}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex'>
                                <RxCross2 className='cursor-pointer hover:bg-gray-100' onClick={() => dispatch(removeItem(item._id))} />
                            </div>
                        </div>
                    ))
                }
            </Wrapper>
            {cartItems.length <= 0 ? <Link className="flex justify-center" to='/'>
                <button className='bg-red-700 rounded-full text-sm text-white py-3 px-6 hover:bg-green-500'>
                    Add Products
                </button>
            </Link> :
                <>
                    <div className='flex justify-end mx-5 my-5 gap-2'>
                        <h1 className='text-sm font-normal'>Shipping Charges:</h1>
                        <span className='text-sm text-red-700 font-semibold'> ${shippingCharge}</span>
                    </div>
                    <div className='flex justify-end mx-5 my-5 gap-2'>
                        <h1 className='text-sm font-semibold'>SubTotal:</h1>
                        <span className='text-sm text-red-700 font-semibold'>${totalAmt + shippingCharge}</span>
                    </div>
                    <div className='flex gap-5 mx-5 my-5'>
                        <Link to='/viewCart'>
                            <button className='bg-red-700 rounded-full text-sm text-white py-3 px-6 hover:bg-green-500'>
                                View Cart
                            </button>
                        </Link>
                        <Link className='testi' to='/placeorder' state={{totalAmt:totalAmt}}>
                            <button className='bg-red-700 text-white text-sm py-3 px-6 rounded-full hover:bg-green-500'>
                                Check Out
                            </button>
                        </Link>
                    </div>
                </>
            }
        </>
    )
}
