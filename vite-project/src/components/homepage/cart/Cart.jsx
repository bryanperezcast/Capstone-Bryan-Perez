import './Cart.css'
import NavBar from '../navbar/NavBar'
import Checkout from '../../checkoutpage/Checkout'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'

function Cart(props) {
  const userId = props.userId;
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    async function renderUserCart() {
        try {
            const response = await fetch(`https://fakestoreapi.com/carts/user/${userId}`)
            const result = await response.json()
            const items = result[0]
            setCartItems(items.products);
        } catch (err) {
            console.error(err)
        }
    }
    renderUserCart();
}, [])
  console.log(cartItems)
  function CheckoutBtn () {
    const path = `/Checkout`
    navigate(path);
  }
  
    return (
      <div>
        <NavBar />
        <button onClick={CheckoutBtn}>Checkout</button>
        <h1>Cart</h1>
      </div>
    )
  }
  
  export default Cart