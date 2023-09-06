import './App.css'
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

function App() {

  return (
    <div>
        <Link to=''></Link>
        <div className='Routes'>
          <Routes>
            <Route path='/Home' element={<Home />}/>
            <Route path='' element={<Login />}/>
            <Route path='/Cart' element={<Cart />}/>
            <Route path='/Checkout' element={<Checkout />}/>
            <Route path='/Itemdetails/:id' element={<ItemDetails />}/>
            <Route path='/Home/Category' element={<Category />}/>
            <Route path='/Home/Price/:id' element={<Price />}/>
            <Route path='/Home/Rating' element={<Rating />}/>
          </Routes>
        </div>
    </div>
  )
}

export default App
