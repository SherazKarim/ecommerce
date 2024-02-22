import React from 'react'

export const Data4 = () => {
    const data = [
        {
            id: 1,
            desc: "Ndure",
            size: "Z51-70",
            oldPrice: "$69.00",
            newPrice: "$42.00",
            image: "https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/4-min-300x300.jpg"
        },
        {
            id: 2,
            desc: "Ndure",
            size: "Z51-70",
            newPrice: "$42.00",
            image: "https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/1-min-300x300.jpg"
        },
        {
            id: 3,
            desc: "Ndure",
            size: "Z51-70",
            oldPrice: "$69.00",
            newPrice: "$42.00",
            image: "https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/3-min-1-300x300.jpg"
        },
        {
            id: 4,
            desc: "Ndure",
            size: "Z51-70",
            newPrice: "$42.00",
            image: "https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/6-min-300x300.jpg"
        },
        {
            id: 5,
            desc: "Ndure",
            size: "Z51-70",
            oldPrice: "$69.00",
            newPrice: "$42.00",
            image: "https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/4-min-300x300.jpg"
        },
        {
            id: 6,
            desc: "Ndure",
            size: "Z51-70",
            newPrice: "$42.00",
            image: "https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/1-min-300x300.jpg"
        },
        {
            id: 7,
            desc: "Ndure",
            size: "Z51-70",
            oldPrice: "$69.00",
            newPrice: "$42.00",
            image: "https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/3-min-1-300x300.jpg"
        },
        {
            id: 8,
            desc: "Ndure",
            size: "Z51-70",
            newPrice: "$42.00",
            image: "https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/6-min-300x300.jpg"
        }
    ]
    return (
        <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-3 w-full mt-3'>
            {data.map((item) => (
                <div key={item.id} className='hover:shadow-2xl transition-all duration-500 hover:opacity-60 flex flex-col w-full pt-10 px-12 py-2'>
                <img className='h-auto lg:w-36' src={item.image} />
                <div className='flex flex-col lg:justify-start lg:items-start justify-center items-center gap-1 w-full'>
                    <span className='font-semibold whitespace-nowrap text-[15px] text-black'>{item.desc}</span>
                    <span className='font-semibold text-[15px] text-black text-start'>{item.size}</span>
                    <div className='flex justify-between'>
                        {item.oldPrice && (
                            <>
                                <span className=' text-[18px] font-[600] text-red-300  line-through'>{item.oldPrice}</span>
                                <span>-</span>
                            </>
                        )}
                        <span className='text-[18px] font-[600] text-red-800'>{item.newPrice}</span>
                    </div>
                </div>
            </div>
            ))
            }
        </div>
    )
}
