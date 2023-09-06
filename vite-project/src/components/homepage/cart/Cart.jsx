import './Cart.css'
import NavBar from '../navbar/NavBar'
import Checkout from '../../checkoutpage/Checkout'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const navigate = useNavigate();

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