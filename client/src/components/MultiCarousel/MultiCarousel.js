import React from 'react'
import Wrapper from '../wrapper/Wrapper'
import { Swiper, SwiperSlide } from 'swiper/react';
import { CiShoppingBasket } from "react-icons/ci";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AOS from 'aos'

import { EffectFade, A11y, Navigation, Pagination } from 'swiper/modules';
import MostPopularItems from './MostPopularItems';

const MultiCarousel = () => {
    return (
        <Wrapper className='grid lg:grid-cols-3 gap-3'>
            <MostPopularItems />
            <MostPopularItems />
            <MostPopularItems />
        </Wrapper>
    )
}

export default MultiCarousel