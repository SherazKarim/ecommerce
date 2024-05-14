import React, { useEffect, useMemo, useState } from 'react'
import { BsPersonSquare } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component"
import { newRequest } from '../utills/newRequest';
import Model from '../../Dashbord/model/Model';
import { HiThumbUp } from "react-icons/hi";
import { HiThumbDown } from "react-icons/hi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { UpdateReview } from './UpdateReview';
import { FaStar } from "react-icons/fa";

export const Reviews = ({ data, fetchData, parentData, errorMessage }) => {
    const localData = JSON.parse(localStorage.getItem('currentUser'))
    const [message, setMessage] = useState("")
    const [messageModel, setMessageModel] = useState(false)
    const [email, setEmail] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [loader, setLoader] = useState(false)
    const [updateForm, setUpdateForm] = useState(false)
    const [rating, setRating] = useState(0)
    const [selectedId, setSelectedId] = useState(0)
    const [review, setReview] = useState(null)
    const [user, setUser] = useState({
        name: "",
        email: "",
        ratings: rating,
        review: "",
        image: ""
    })
    const { id } = useParams()

    const handleDropdown = (id) => {
        setSelectedId(id)
    };

    useEffect(() => {
        setEmail(localData.user.email)
        setProfileImage(localData.user.image)
        handleThumbs()
    }, [])


    const handleSubmit = async (e) => {
        // setUser({
        //     name: "",
        //     email: "",
        //     ratings: 0,
        //     review: "",
        //     image: ""
        // })
        console.log("rating before", rating)
        try {
            setLoader(true)
            const response = await newRequest.post(`/reviews/createReview/${id}`, {
                ...user,
                productId: parentData._id,
                ratings: rating,
                email: email,
                image: profileImage
            });
            setMessage(response.data.message);
            setUser({
                name: "",
                email: "",
                ratings: rating,
                review: "",
                image: ""
            })
       
            if (response.status === 200) {
                setRating(prev => prev = 0)
                console.log("rating after", rating)
                setLoader(false)
                setMessageModel(true)
                fetchData()
            }
        } catch (error) {
            if (error.response) {
                setLoader(false)
                setMessageModel(true)
                setMessage(error.response.data.message)
            }
        }
    }

    const handleThumbs = async (item, action) => {
        try {
            if (email) {
                const response = await newRequest.post(`/reviews/updateThumbs/productId/${item.productId}/reviewId/${item._id}`, {
                    action: action,
                    email: email
                });
                if (response.status === 200) {
                    fetchData()
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    const updatePopUp = (item) => {
        setSelectedId(0);
        setUpdateForm(true);
        setReview(item)
        // setOpenDropdownId(false)
    }

    const deleteReview = async (item) => {

        try {
            const response = await newRequest.delete(`/reviews/productId/${item.productId}/deleteReview/reviewId/${item._id}`)
            setMessage(response.data.message)
            if (response.status === 200) {
                setLoader(false)
                setMessageModel(true)
                fetchData()
            }
        } catch (err) {
            if (err.response) {
                setLoader(false)
                setMessageModel(true)
                setMessage(err.response.data.message)
            }
        }
    }

    const handleRating = (rate) => {
        console.log(rate)
        setRating(rate)
    }

    const handleChange = (e) => {
        setUser((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }


    return (
        <>
            {
                updateForm && <div>
                    <div className='bg-black/[0.50] min-h-screen flex justify-center items-center top-0 left-0 w-full fixed'><UpdateReview data={review} fetchData={fetchData} setUpdateForm={setUpdateForm} selectedId={selectedId} /></div>
                </div>
            }
            <div id='id' onClick={(e) => { e.stopPropagation(); e.preventDefault(); setSelectedId(0) }}>
                <div className="class">
                    {data && data?.length > 0 && <h3 className='font-bold text-lg pb-5'>Reviews</h3>}

                    {
                        data && data?.length > 0 ? data?.map((item) => (
                            <div className="flex  gap-x-3 mb-5 w-full" >
                                {
                                    item.image ? <img className='w-10 h-10 rounded-full' src={item.image} /> : <BsPersonSquare size={40} color='grey' />
                                }
                                <div className='border p-4 w-full shadow-lg flex'>
                                    <div className='w-full'>
                                        <h3>{item.name}</h3>
                                        <div className='flex flex-row'>
                                            {
                                                Array.from({ length: item.ratings }).map(() => (
                                                    <FaStar color='red' />
                                                ))
                                            }
                                        </div>
                                        <p>{item.review}</p>
                                    </div>

                                    <div className='flex flex-col justify-between'>
                                        <div className='self-end relative'>
                                            <button id='ids' className='flex flex-row  cursor-pointer transition duration-150 ease-in-out' onClick={(e) => { handleDropdown(item._id); e.stopPropagation() }}>
                                                {
                                                    email === item.email ?
                                                        <HiOutlineDotsHorizontal />
                                                        : ""
                                                }
                                            </button>
                                            {(selectedId === item._id && selectedId !== 0) && (
                                                <div className='bg-gray-200 absolute h-14 w-16 top-3 left-[-49px] shadow-md rounded-sm'>
                                                    <div className='py-2 text-sm'>
                                                        <button className='cursor-pointer w-full hover:bg-gray-100 flex text-start ps-2' onClick={() => updatePopUp(item)}>Edit</button>

                                                        <button className='cursor-pointer w-full hover:bg-gray-100 flex text-start ps-2' onClick={() => deleteReview(item)}>Delete</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex gap-4'>
                                            <div className="flex justify-center items-center cursor-pointer ">
                                                <HiThumbUp className={`${item.thumbs.reviewliked ? "text-red-600" : "text-gray-400"}`} onClick={() => handleThumbs(item, 'thumbUp')} />
                                                <h3 className='text-xs text-gray-400'>{item.thumbs.thumbUp}</h3>
                                            </div>
                                            <div className="flex justify-center items-center cursor-pointer">
                                                <HiThumbDown className={`${item.thumbs.reviewDisliked ? "text-red-600" : "text-gray-400"}`} onClick={() => handleThumbs(item, 'thumbDown')} />
                                                <h3 className='text-xs text-gray-400'>{item.thumbs.thumbDown}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        ) : <h3 className='font-bold text-lg pb-5'>{errorMessage}</h3>
                    }


                    <div className='bg-gray-200 mt-8 px-5 pb-8 pt-[1px] rounded-md '>
                        <h3 className='font-bold text-lg pb-5 mt-8'>Add a Review</h3>
                        <p>Your email address will not be published. Required fields are marked *</p>
                        <form className="space-y-4 md:space-y-6 mt-4" action="#">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                <input type="name" name="name" id="name" value={user.name} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Xyz...." required onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} id='email' name="email" value={email} readOnly />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="class">
                                        <h3>Your ratings *</h3>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <ReactStars
                                            onChange={handleRating}
                                            value={rating}
                                            size={20}
                                            label
                                            transition
                                            fillColor='orange'
                                            emptyColor='gray'
                                            className='foo'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="review" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Review</label>
                                <textarea value={user.review} name="review" id="" cols="30" rows="2" className='w-full' onChange={handleChange}></textarea>
                            </div>
                            <button onClick={() => handleSubmit()} type="submit" className="w-fit relative flex justify-center items-center text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{loader ? (<div role="status">
                                <svg aria-hidden="true" class="h-5 w-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>) : "Submit"}</button>
                        </form>
                        {
                            messageModel && <Model message={message} setMessageModel={setMessageModel} />
                        }

                    </div>
                </div>

            </div>

        </>
    )
}
