import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useLocation } from "react-router-dom"
import { itemDetails, singleItem } from './app/features/productSlice';
import { useDispatch } from 'react-redux'
import { newRequest } from './components/utills/newRequest';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import Home from './pages/home/Home';

// components 
import Success from "./pages/messages/Success"
import Shop from './pages/Shop/Shop';
import { SignIn } from './pages/SignIn/SignIn';
import { SignUp } from './pages/SignUp/SignUp';
import { ToastContainer, toast } from 'react-toastify';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { ProductDetails } from './pages/ProductDetails/ProductDetails';
import { ViewCart } from './pages/ProductDetails/ViewCart';
import Dashboard from './Dashbord/home/Home';
import Products from './Dashbord/pages/products/Products';
import Orders from './Dashbord/pages/orders/Orders';
import AddProduct from './Dashbord/pages/addProducts/AddProducts';
import Users from './Dashbord/pages/user/User';
import Header from './Dashbord/header/Header';
import SideBar from './Dashbord/sidebar/SideBar';
import Admin from './Dashbord/home/Home';
import PlaceOrder from "./pages/placeOrder/PlaceOrder"
function App() {
  const [openSideBar, setOpenSideBar] = useState(false)
  const dispatch = useDispatch()
  const queryClient = new QueryClient()
  const fetchData = async () => {
    try {
      const response = await newRequest.get("/product/get");
      const result = await response.data;
      dispatch(itemDetails(result))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  const location = useLocation();
  const { pathname } = location; // Destructure pathname directly
  const isDashboardRoute = pathname.startsWith("/admin")
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      {isDashboardRoute ? (
        <>
          <Header setOpenSideBar={setOpenSideBar} />
          <div className="grid grid-cols-12 w-full mt-4">
            <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
            <div className="lg:col-span-10 col-span-12  h-auto">
              <Routes>
                <Route path='/admin' element={<Admin />} />
                <Route path='/admin/products' element={<Products />} />
                <Route path='/admin/orders' element={<Orders />} />
                <Route path='/admin/addproducts' element={<AddProduct />} />
                <Route path='/admin/users' element={<Users />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signIn' element={<SignIn />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path={`/product/:id`} element={<ProductDetails />} />
            <Route path='/viewCart' element={<ViewCart />} />
            <Route path='/success' element={<Success />} />
            <Route path='/shopNow/' element={<Shop />} />
            <Route path='/placeorder' element={<PlaceOrder />} />
            <Route path='/dashboard' element={<Admin />} />
          </Routes>
          <Footer />
        </>
      )}
    </QueryClientProvider>
  );
}

export default App;
