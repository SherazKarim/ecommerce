import './App.css';
import { Carousel } from './components/Carousel/Carousel';
import React, { useEffect } from 'react';
import AOS from 'aos'
import "aos/dist/aos.css";
import { ShoeSample } from './components/shoeSample/ShoeSample';
import { PopularProducts } from './components/popularProducts/PopularProducts';
import { Info } from './components/Info/Info';
import { DiscountProduct } from './components/DiscountProduct/DiscountProduct';
import { Carousel2 } from './components/Carousel2/Carousel2';
import { ViewedProduct } from './components/ViewedProducts/ViewedProduct';
import { TopBrands } from './components/TopBrands/TopBrands';
import MultiCarousel from './components/MultiCarousel/MultiCarousel';
import { itemDetails,singleItem } from './app/features/productSlice';
import {useDispatch} from 'react-redux'
import { newRequest } from './components/utills/newRequest';
import { useParams } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { Swiper } from 'swiper/react';


AOS.init();

function App() {
  const params = useParams()
  const dispatch = useDispatch()
  const queryClient = new QueryClient()
  useEffect(() => {
    AOS.init();
  }, []);

const fetchData = async () =>{
  try {
      const response = await newRequest.get("/product/get");
      const result  = await response.data;
      dispatch(itemDetails(result))
  } catch (error) {
      console.log(error)
  }
}

useEffect(() => {
    fetchData()
}, [])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Carousel />
        <ShoeSample />
        <PopularProducts />
        <Info />
        <DiscountProduct />
        <Carousel2 />
        <ViewedProduct />
        <TopBrands />
        <MultiCarousel />
      </QueryClientProvider>
    </>
  );
}

export default App;
