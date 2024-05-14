import React, { useEffect, useState } from 'react'
import upload from '../../../components/utills/upload';
import { newRequest } from '../../../components/utills/newRequest';

const UpdadeProduct = ({ setUpdateProductModel, setExistingData, existingData, setMessage, setMessageModel }) => {
    const [file, setFile] = useState(existingData?.image[0]);
    if (existingData === null) return

    const handleImageChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const url = await upload(selectedFile)
            setFile(url)
        }
    }

    const onChange = (e) => {
        setExistingData({ ...existingData, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await newRequest.put(`product/updateProduct/${existingData._id}`, {
                ...existingData,
                image: file 
            });
            if (response.status === 200) {
                setMessage(response.data.message)
                setUpdateProductModel(false)
                setMessageModel(true)
            }
        } catch (error) {
            setUpdateProductModel(false)
            setMessage(error.message, "Check your Internet Connection and try again!")
            setMessageModel(true)
        }
    }

    const { title, desc, subTitle, price, discount } = existingData
    return (
        <div className='fixed top-0 left-0 z-50 bg-gray-50/[0.25] h-full w-[100vw] transition-all ease duration-300 flex justify-center items-center overflow-auto'>
            <div className="bg-white w-[80%] border p-4 rounded-[4px]">
                <button onClick={() => setUpdateProductModel(false)}>Close</button>
                <form className='grid grid-cols-12 gap-2' onSubmit={handleSubmit}>
                    <div className="flex flex-col items-start gap-y-2 sm:col-span-6 col-span-12">
                        <label htmlFor="title" className='text-[16px] font-[500] text-gray-600/[0.90]'>Product Name</label>
                        <input type="text" id='title' name='title' className='border-gray-100 rounded-[4px] w-full px-2 py-3 text-[400]' placeholder='product name' value={title} onChange={onChange} />
                    </div>
                    <div className="flex flex-col items-start gap-y-2 sm:col-span-6 col-span-12">
                        <label htmlFor="subTitle" className='text-[16px] font-[500] text-gray-600/[0.90]'>Brand</label>
                        <select className='border-gray-100 rounded-[4px] w-full px-2 py-3 text-[400] cursor-pointer' name="subTitle" id="subTitle" value={subTitle} onChange={onChange}>
                            <option value="select an brand">select a brand</option>
                            <option value="Service Shoes">Service Shoes</option>
                            <option value="Bata shoes">Bata shoes</option>
                            <option value="Ndure shoes">Ndure shoes</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-start gap-y-2 sm:col-span-6 col-span-12">
                        <label htmlFor="price" className='text-[16px] font-[500] text-gray-600/[0.90]'>Price</label>
                        <input type="number" id='price' name='price' value={price} className='border-gray-100 rounded-[4px] w-full px-2 py-3 text-[400]' placeholder='price' onChange={onChange} />
                    </div>
                    <div className="flex flex-col items-start gap-y-2 sm:col-span-6 col-span-12">
                        <label htmlFor="discount" className='text-[16px] font-[500] text-gray-600/[0.90]'>Discount Price</label>
                        <input type="number" id='discount' value={discount} name='discount' className='border-gray-100 rounded-[4px] w-full px-2 py-3 text-[400]' placeholder='discount price' onChange={onChange} />
                    </div>
                    <div className="flex flex-col items-start gap-y-2 col-span-12">
                        <label className="text-[16px] font-[500] text-gray-600/[0.90]" htmlFor="productImage">Product Image</label>
                        <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="productImage" type="file" onChange={handleImageChange} />
                    </div>
                    <div className="flex flex-col items-start gap-y-2 col-span-12">
                        <label htmlFor="desc" className='text-[16px] font-[500] text-gray-600/[0.90]'>Discription</label>
                        <textarea className='border-gray-100 rounded-[4px] w-full px-2 py-3 text-[400]' name="desc" id="desc" rows="5" value={desc} onChange={onChange}></textarea>
                    </div>
                    <button type="submit" className='px-16 py-2 flex justify-center items-center bg-red-700 hover:bg-red-800 text-white text-[14px] text-[400] rounded-[4px] transition-colors duration-300 ease'>Update</button>

                </form>
            </div>
        </div>
    )
}

export default UpdadeProduct