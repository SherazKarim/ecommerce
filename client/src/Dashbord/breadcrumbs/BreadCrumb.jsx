import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumb = ({params}) => {
  return (
    <h3 className="flex justify-start items-center gap-2 bg-white rounded-full mb-4">
        <Link to={"/dashboard"} className="text-[14px] font-[500] text-gray-600/[0.90]">Admin</Link>
        <span className="text-gray-600/[0.90]">/</span>
        <p className="capitalize text-[14px] font-[500]">
          <span className={"text-orange-600"}>
            {params}
          </span>
        </p>
      </h3>
  )
}

export default BreadCrumb