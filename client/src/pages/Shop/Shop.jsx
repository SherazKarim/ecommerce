import React, { useState, useEffect } from "react";
import "./Shop.css";
import RangeSlider from "../../components/multiRangeSlider/RangeSlider";
import Wrapper from "../../components/wrapper/Wrapper";
import { RightSide } from "../../components/RightSide/RightSide";
import { Link } from "react-router-dom";
import { newRequest } from "../../components/utills/newRequest";
import { ProByRatings } from "../../components/ProByRatings/ProByRatings";
import { FilterProducts } from "../../components/FilterProducts/FilterProducts";

const Shop = () => {
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(1000);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await newRequest.get("/product/get");
        const result = response.data;
        setAllProducts(result);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(allProducts)
  }, [allProducts])

  const handleFilter = () => {
    const filtered = allProducts.filter(
      (product) => product.price >= minRange && product.price <= maxRange
    );
    setFilteredProducts(filtered);
  };

  const handleCategory=(title)=>{
    const filteredByBrand = allProducts.filter(
      (product)=>product.title === title
    )
    setFilteredProducts(filteredByBrand)
  }

  return (
    <>
      <div className="bg-[#fafafa] mb-10">
        <Wrapper className="flex flex-wrap items-start font-semibold sm:gap-5 gap-2 justify-start py-6">
          <Link to="/">
            <h1>Home</h1>
          </Link>
          <span>&gt;</span>
          <h1 className="text-gray-500">Shop </h1>
        </Wrapper>
      </div>

      <Wrapper className="grid grid-cols-12 lg:gap-x-4 gap-y-4 w-full">
        <div className="lg:col-span-3 col-span-12">
          <div className="flex flex-col gap-y-5">
          <RangeSlider
            min={40}
            max={1000}
            onChange={({ min, max }) => {
              setMinRange(min);
              setMaxRange(max);
            }}
            onFilter={handleFilter}
          />
                <ProByRatings />
                <FilterProducts handleCategory={handleCategory}/>
          </div>
        </div>
        <div className="lg:col-span-9 col-span-12">
            <div className="flex flex-col">
            <RightSide loading={loading} allProducts={allProducts} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts}/>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Shop;
