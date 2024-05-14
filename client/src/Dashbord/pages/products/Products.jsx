import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import BreadCrumb from '../../breadcrumbs/BreadCrumb';
import { newRequest } from '../../../components/utills/newRequest';
import UpdadeProduct from '../../components/updateProduct/UpdadeProduct';
import Model from '../../model/Model';

const Products = () => {
    const location = useLocation();
    const paramsLength = location.pathname.length
    const params = location.pathname.slice(7, paramsLength);;
    const [productsData, setProductsData] = useState([])
    const [existingData, setExistingData] = useState(null)
    const [UpdadeProductModel, setUpdateProductModel] = useState(true)
    const [loader, setLoader] = useState(true)
    const [messageModel, setMessageModel] = useState(false)
    const [message, setMessage] = useState("")

    const fetchAllProducts = async () => {
        try {
            const response = await newRequest.get("product/get");
            if (response.status === 200) {
                setLoader(false)
                setProductsData(response.data)
            }
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchAllProducts()
    }, []);

    // if(!messageModel) fetchAllProducts()

    const deleteProduct = async (id) => {
        try {
            const res = await newRequest.delete(`product/delete/${id}`);
            if (res.status === 200) {
                setMessage(res.data)
                setMessageModel(true)
            }
        } catch (error) {
            setMessage(error.message)
            setMessageModel(true)
        }
    }

    const handleUpdate = (item) => {
        setUpdateProductModel(true)
        setExistingData(item)
    }



    return (
        <>
            <div className='px-3'>
                <BreadCrumb params={params} />
                {loader ? <h1 className='text-center'>Loading</h1> : <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    product name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    image
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    description
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    price
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    discount
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productsData && productsData.map((item) => (
                                    <>
                                        <tr key={item._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.title}
                                            </th>
                                            <td class="px-6 py-4 relative">
                                                <img className='absolute w-[40px] h-[40px] top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] rounded-full ' src={item?.image ? item.image[0] : ""} alt="" />
                                            </td>
                                            <td class="px-6 py-4">
                                                <p className=' w-[50px] overflow-hidden whitespace-nowrap text-ellipsis'>{item.desc}</p>
                                            </td>
                                            <td class="px-6 py-4">
                                                <span>${item.price}</span>
                                            </td>
                                            <td class="px-6 py-4">
                                                <span>{item.discount}%</span>
                                            </td>
                                            <td class="px-6 py-4 ">
                                                <p className=''>Available</p>
                                            </td>
                                            <td class="px-6 py-4 flex gap-3">
                                                <button className='text-blue-600' onClick={() => handleUpdate(item)}>Edit</button>
                                                <span>/</span>
                                                <button className='text-red-600' onClick={() => deleteProduct(item._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    </>
                                ))

                            }
                        </tbody>
                    </table>
                </div> || productsData.length < 1 && <h1>No Products Found!</h1>}
            </div>
            {UpdadeProductModel && <UpdadeProduct existingData={existingData} setUpdateProductModel={setUpdateProductModel} setMessage={setMessage} setMessageModel={setMessageModel} setExistingData={setExistingData}/>}
            {messageModel && <Model message={message} setMessageModel={setMessageModel} fetchAllProducts={fetchAllProducts}/>}
        </>
    )
}

export default Products