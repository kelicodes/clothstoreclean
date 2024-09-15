import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Loginsignup from './pages/Loginsignup'
import Shopcategory from './pages/Shopcategory'
import Footer from './components/Footer/Footer'
import menbanner from './components/asset/banner_mens.png'
import womensbanner from './components/asset/banner_women.png'
import kidsbanner from './components/asset/banner_kids.png'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/men' element={<Shopcategory banner={menbanner} category='men' />} />
          <Route path='/women' element={<Shopcategory banner={womensbanner} category='women' />} />
          <Route path='/kids' element={<Shopcategory banner={kidsbanner} category='kid' />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Loginsignup />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
