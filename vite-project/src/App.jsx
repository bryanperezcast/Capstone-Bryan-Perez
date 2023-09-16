import './App.css'
import { useState, useEffect } from 'react'
import Home from './components/homepage/Home'
import Search from './components/homepage/searchbar/Search'
import Login from './components/loginpage/Login'
import Cart from './components/homepage/cart/Cart'
import Checkout from './components/checkoutpage/Checkout'
import ItemDetails from './components/homepage/itemdetails/ItemDetails'
import Category from './components/homepage/filter/category/Category'
import Price from './components/homepage/filter/price/Price'
import Rating from './components/homepage/filter/rating/Rating'
import { Routes, Route, Link } from 'react-router-dom'
import { CartProvider } from './components/CartContext'
import { useCart } from './components/CartContext'

function App() {
    const [userId,setUserId] = useState("")
    const { setCartItemIds } = useCart();

    useEffect(() => {
      const storedCartData = localStorage.getItem('cartItemIds');

      if (storedCartData) {
        const parsedCartData = JSON.parse(storedCartData);
        setCartItemIds(parsedCartData);
      }

    }, []);
  return (
      <div>
          <Link to=''></Link>
          <div className='Routes'>
          <CartProvider>
            <Routes>
              <Route path='/Home' element={<Home />}/>
              <Route path='' element={<Login userId={userId} setUserId={setUserId} />}/>
              <Route path='/Cart' element={<Cart userId={userId} setUserId={setUserId} />}/>
              <Route path='/Checkout' element={<Checkout />}/>
              <Route path='/Itemdetails/:id' element={<ItemDetails userId={userId} />}/>
              <Route path='/Home/Category' element={<Category />}/>
              <Route path='/Home/Price/:id' element={<Price />}/>
              <Route path='/Home/Rating' element={<Rating />}/>
            </Routes>
            </CartProvider>
          </div>
      </div>
  )
}

export default App
