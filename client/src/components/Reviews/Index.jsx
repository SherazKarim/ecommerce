import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Reviews } from './Reviews'
import { useSelector } from 'react-redux'
import { newRequest } from '../utills/newRequest'

export const Index = ({ parentData }) => {
    const [data, setData] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [activeSection, setActiveSection] = useState('description');

    const fetchData = async () => {
        try {
            const response = await newRequest.get(`/reviews/getReviewsByProductId/${parentData?._id}`)
            const resData = response.data.reviews

            if (response.status === 200) {
                setData(resData)
            }
        } catch (error) {
            console.log(error)
            setErrorMessage(error.response.data.message)
        }
    }

    const handleSectionClick = (section) => {
        setActiveSection(section);
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="border rounded-lg shadow-md">
            <div className=' w-full p-5'>
                <div className="relative border-b-2 gap-x-8 flex text-sm font-bold mb-5">
                    <Link
                        className={`relative h-full ${activeSection === 'description' ? ' hover:text-red-700 text-red-700  before:absolute before:w-full before:h-[2px] before:bottom-0 before:bg-red-600 before:top-5' : 'gap-2 hover:text-red-700'}`}
                        onClick={() => handleSectionClick('description')}
                    >
                        Description
                    </Link>
                    <Link
                         className={`relative h-full ${activeSection === 'reviews' ? ' hover:text-red-700 text-red-700  before:absolute before:w-full before:h-[2px] before:bottom-0 before:bg-red-600 before:top-5 ' : 'gap-2 hover:text-red-700'}`}
                        onClick={() => handleSectionClick('reviews')}
                    >
                        Reviews<span className='text-red-700'>({data.length})</span>
                    </Link>
                </div>

                {activeSection === 'description' && (
                    <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste deserunt delectus harum ut veniam voluptatibus officiis, consequatur necessitatibus nobis, cupiditate quae magni nesciunt nam quidem officia beatae. Ipsam, sit sed.</p>
                )}

                {activeSection === 'reviews' && <Reviews data={data} parentData={parentData} fetchData={fetchData} errorMessage={errorMessage}/>}
            </div>
        </div>
    )
}
