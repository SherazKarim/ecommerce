import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import BreadCrumb from '../../breadcrumbs/BreadCrumb';
import { newRequest } from '../../../components/utills/newRequest';

const Users = () => {
  const location = useLocation();
  const paramsLength = location.pathname.length
  const params = location.pathname.slice(7, paramsLength);
  const [loader, setLoader] = useState(true)
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const response = await newRequest.get("auth/allUsers")
      if (response.status === 200) {
        setLoader(false)
        setUsers(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <div className='p-3'>
      <BreadCrumb params={params} />
      {loader ? <h1 className='text-center'>Loading...</h1> : <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Created At
              </th>
              <th scope="col" class="px-6 py-3">
                User name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                AuthSource
              </th>
              <th scope="col" class="px-6 py-3">
                IsAdmin
              </th>
              <th scope="col" class="px-6 py-3">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              users && users.map((user) => (
                <>
                  <tr key={user._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <span>{user.createdAt.slice(0, 10)}</span>
                    </th>
                    <td class="px-6 py-4 relative">
                     <span>{user?.name} </span> 
                    </td>
                    <td class="px-6 py-4">  
                      <span className=''>{user.email}</span>
                    </td>
                    <td class="px-6 py-4">
                      <span>{user.authSource}</span>
                    </td>
                    <td class="px-6 py-4">
                      <span className={`${user.isAdmin? "text-blue-700" : "text-red-700"}`}>{user.isAdmin.toString()}</span>
                    </td>
                    <td class="px-6 py-4 flex gap-3">
                      <button className='text-blue-600'>Edit</button>
                      <span>/</span>
                      <button className='text-red-600' >Delete</button>
                    </td>
                  </tr>
                </>
              ))

            }
          </tbody>
        </table>
      </div> || "productsData.length < 1 && <h1>No Products Found!</h1>"}
    </div>
  )
}

export default Users