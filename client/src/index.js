import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { ProductDetails } from './pages/ProductDetails/ProductDetails';
import { ViewCart } from './pages/ProductDetails/ViewCart';
import { store } from './app/store'
import { Provider } from 'react-redux'
import Success from "./pages/messages/Success"
import Shop from './pages/Shop/Shop';
const elem = document.getElementById('root').addEventListener("scroll", () => window.scrollTo(0, 0))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    
    <Navbar/>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path={`${`/product/:id` ? `/product/:id` : `/shopNow/product/:id`}`} element={<ProductDetails/>}/>
      <Route path='/viewCart' element={<ViewCart/>}/>
      <Route path='/success' element={<Success/>}/>
      <Route path='/shopNow/' element={<Shop />}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
