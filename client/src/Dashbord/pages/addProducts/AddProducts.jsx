import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import BreadCrumb from '../../breadcrumbs/BreadCrumb';
import { newRequest } from '../../../components/utills/newRequest';
import upload from '../../../components/utills/upload';
import  Model  from '../../model/Model';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    price: 0,
    discount: 0,
    image: [],
    desc: ""
  });
  const [messageModel, setMessageModel] = useState(false)
  const [message, setMessage] = useState("")
  const [file, setFile] = useState(null);

  const location = useLocation();
  const paramsLength = location.pathname.length
  const params = location.pathname.slice(7, paramsLength);


  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    if(selectedFile){
      const url = await upload(selectedFile)
      setFile(url)
    }
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, image: file })
  }

  const handleSubmit = async (e) => {
    console.log("reached")
    e.preventDefault();
    try {
      const response = await newRequest.post("product/addproduct", formData);
      console.log(response)
      if (response.status === 200) {
        setMessage(response.data.message)
        setMessageModel(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const { title, subTitle, price, discount, image, desc } = formData


  return (
    <>
      <div className='px-3'>
        <BreadCrumb params={params} />

        {/* add product form  */}
        <form className='w-full border grid grid-cols-12 gap-4 p-3 rounded-[4px]' onSubmit={handleSubmit}>
          <div className="flex flex-col items-start gap-y-2 sm:col-span-6 col-span-12">
            <label htmlFor="title" className='text-[16px] font-[500] text-gray-600/[0.90]'>Product Name</label>
            <input type="text" id='title' value={title} name='title' className='border-gray-100 rounded-[4px] w-full px-2 py-3 text-[400]' placeholder='product name' onChange={onChange} />
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

          {/* submit button  */}
          <button type="submit" className='px-16 py-2 flex justify-center items-center bg-red-700 hover:bg-red-800 text-white text-[14px] text-[400] rounded-[4px] transition-colors duration-300 ease'>Submit</button>
        </form>
      </div>
      {
        messageModel && <Model message={message} setMessageModel={setMessageModel}/>
      }
    </>
  )
}

export default AddProduct
