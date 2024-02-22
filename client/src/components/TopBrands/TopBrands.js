import React from 'react'
import Wrapper from '../wrapper/Wrapper'

export const TopBrands = () => {
    const data = [
        {
            id: 1,
            image: "https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/b1-min.png"
        },
        {
            id: 2,
            image: "https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/b3-min.png"
        },
        {
            id: 3,
            image: "https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/b4-min.png"
        },
        {
            id: 4,
            image: "https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/b5-min.png"
        },
        {
            id: 5,
            image: "https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/b2-min-1.png"
        },
    ]
    return (
        <Wrapper className='my-10'>
            <div>
                <h1 className='text-start mb-10 font-semibold text-[1.6rem]'>Top Brands</h1>
                <div className='flex lg:flex justify-between'>
                {
                        data.map((item) => (
                <div key={item.id} className=' mx-16 opacity-50 hover:opacity-100'>
                    
                            <img src={item.image} />
                      

                </div>
                  ))}
                  </div>
            </div>
        </Wrapper>
    )
}
