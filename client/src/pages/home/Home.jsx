import { Carousel } from "../../components/Carousel/Carousel"
import { Carousel2 } from "../../components/Carousel2/Carousel2"
import DiscountProduct from "../../components/DiscountProduct/DiscountProduct"
import { Info } from "../../components/Info/Info"
import MultiCarousel from "../../components/MultiCarousel/MultiCarousel"
import { TopBrands } from "../../components/TopBrands/TopBrands"
import { ViewedProduct } from "../../components/ViewedProducts/ViewedProduct"
import { PopularProducts } from "../../components/popularProducts/PopularProducts"
import { ShoeSample } from "../../components/shoeSample/ShoeSample"


const Home = () => {
    return (

        <>
            <Carousel />
            <ShoeSample />
            <PopularProducts />
            <Info />
            <DiscountProduct />
            <Carousel2 />
            <ViewedProduct />
            <TopBrands />
            <MultiCarousel />
        </>
    )
}

export default Home