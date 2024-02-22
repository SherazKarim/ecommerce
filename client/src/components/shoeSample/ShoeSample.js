import React, { useState } from 'react';
import Wrapper from '../wrapper/Wrapper';
import {Link} from 'react-router-dom'

export const ShoeSample = () => {
    const [hoveredElement, setHoveredElement] = useState(null);

    return (
        <Wrapper className='md:flex gap-8 justify-between my-20 overflow-hidden '>
            <Link to='/shopNow' onClick={()=>window.scroll(0,0)}
                className='relative overflow-hidden cursor-pointer w-full'
                onMouseEnter={() => setHoveredElement("div1")}
                onMouseLeave={() => setHoveredElement(null)}
            >
                <img className='transform duration-500 ease-in-out w-full' src='https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/feature1-min-1.jpg' />
                <div className={`absolute z-50 h-[150%] w-[50%] bg-white/[0.50] top-[-5%] ${hoveredElement === "div1" ? "top-0 right-[120%]" : "right-[-100%]"} transition-all ease-in-out duration-[1.2s] rotate-[-35deg]`}></div>
            </Link>
            <Link to='/shopNow' onClick={()=>window.scroll(0,0)}
                className='relative overflow-hidden cursor-pointer w-full md:mt-0 mt-3'
                onMouseEnter={() => setHoveredElement("div2")}
                onMouseLeave={() => setHoveredElement(null)}
            >
                <img className='transform duration-500 ease-in-out w-full' src='https://demo.xpeedstudio.com/marketov2/shoe/wp-content/uploads/sites/15/2018/10/feature2-min-1.jpg' />
                <div className={`absolute z-50 h-[150%] w-[50%] bg-white/[0.50] top-[-5%] ${hoveredElement === "div2" ? "top-0 right-[120%]" : "right-[-100%]"} transition-all ease-in-out duration-[1.2s] rotate-[-35deg]`}></div>
            </Link>
        </Wrapper>
    );
};
